import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useProductContext } from "../lib/ProductProvider";

import ArrowBack from "../common/ArrowBack";
import ProductCard from "./sections/products/ProductCard";
import SearchIcon from "../assets/icons/SearchIcon";
import SuccessAlert from "../common/SuccessAlert";

const Products = () => {
  const { getProductsData } = useProductContext();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const updateSuccess = queryParams.get("update") === "success";

  const getProducts = async () => {
    const data = await getProductsData();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [getProductsData]);

  return (
    <section className="flex flex-col gap-4">
      <nav className="flex justify-between">
        <div className="flex-none">
          <ArrowBack goBackTo="/" />
        </div>

        {updateSuccess && (
          <div className="flex-none">
            <SuccessAlert message={"Product was successfully updated!"} />
          </div>
        )}

        <div className="flex-none">
          <SearchIcon />
        </div>
      </nav>
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 max-w-[835px]">
          <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
            Clothes
          </h1>
          {products.length === 0 ? (
            <div className="flex flex-col justify-center gap-4 items-center h-40">
              <p className="font-mont">No products are available</p>
              <button
                onClick={getProducts}
                className="font-mont px-4 py-2 bg-black text-white rounded"
              >
                Retry to load products
              </button>
            </div>
          ) : (
            <div className="flex gap-[15px] flex-wrap mb-[9px]">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
