import { useState, useEffect } from "react";
import { useFetchProducts } from "../lib/fetchProducts";

import ArrowBack from "../common/ArrowBack";
import ProductCard from "./sections/products/ProductCard";
import SearchIcon from "../assets/icons/SearchIcon";

const Products = () => {
  const { getData } = useFetchProducts();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await getData();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [getData]);

  return (
    <section className="flex flex-col gap-4">
      <nav className="flex justify-between">
        <ArrowBack goBackTo="/" />
        <SearchIcon />
      </nav>
      <div className="flex flex-col gap-3">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Clothes
        </h1>
        {products.length === 0 ? (
          <div className="flex flex-col justify-center gap-4 items-center h-40">
            <p className="font-mont">No products are available</p>
            <button onClick={getProducts} className="font-mont px-4 py-2 bg-black text-white rounded">
              Retry to load products
            </button>
          </div>
        ) : (
          <div className="flex gap-[15px] flex-wrap justify-center mb-[9px]">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
