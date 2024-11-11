import { useState, useEffect } from "react";

import ArrowBack from "../common/ArrowBack";
import ProductCard from "./sections/products/ProductCard";
import SearchIcon from "../assets/icons/SearchIcon";
import { useLocation } from "react-router-dom";
import SuccessAlert from "../common/SuccessAlert";
import { useProductContext } from "../lib/ProductProvider";

const Products = () => {
  const { getProductsData } = useProductContext();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([])

  const queryParams = new URLSearchParams(location.search);
  const updateSuccess = queryParams.get('update') === 'success';

  const getProducts = async () => {
    const data = await getProductsData();
    setProducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [getProductsData]);

  useEffect(() => {
    const results = products.filter(product =>
      product.brand?.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
    setFilteredProducts(results);
  }, [searchInput, products]);

  return (
    <section className="flex flex-col gap-4">
      <nav className="flex justify-between items-center space-x-4 sm:space-x-8">
        <div className="flex-none">
          <ArrowBack goBackTo="/" />
        </div>

        {updateSuccess && (
          <div className="flex-none">
            <SuccessAlert message={"Product was successfully updated!"} />
          </div>
        )}

        <div className="flex justify-center w-full py-4">
          <div className="relative w-full max-w-xs">
            <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="w-auto py-2 pl-12 pr-10 border rounded-lg shadow-lg hover:shadow-xl"
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>

        </div>
      </nav>
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 max-w-[835px]">
          <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
            Clothes
          </h1>
          {filteredProducts.length === 0 ? (
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
              {filteredProducts.map((product) => (
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
