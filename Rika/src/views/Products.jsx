import React from "react";
import ArrowBack from "../common/ArrowBack";
import ProductCard from "./sections/products/ProductCard";
import SearchIcon from "../assets/icons/SearchIcon";

const Products = () => {
  const productList = [
    {
      id: 1,
      model: "Vado Odelle Dress",
      price: 20,
      brand: "Roller Rabbit",
      image:
        "https://cdn.sanity.io/images/u8zg7cll/production/f6ac780b53f53742b19224aa2e38b592c3365901-2500x2500.svg",
    },
    {
      id: 2,
      model: "William Gross Dress",
      price: 30,
      brand: "Pundish",
      image:
        "https://www.gross.nu/assets/images/misc/about-me-portrait-placeholder.png",
    },
  ];

  return (
    <section className="flex flex-col gap-4 px-4 py-8">
      <nav className="flex justify-between">
        <ArrowBack goBackTo="/" />
        <SearchIcon />
      </nav>
      <div className="flex flex-col gap-3">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Clothes
        </h1>
        <div className="flex gap-[15px] flex-wrap justify-center mb-[9px]">
          {productList.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
