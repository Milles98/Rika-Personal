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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    const trimmedInput = searchInput.trim();

    if (trimmedInput === "") {
      setFilteredProducts(products);
      setNoResults(false);
    } else {
      const results = products.filter(product =>
        product.brand?.toLowerCase().includes(trimmedInput.toLowerCase())
      ); 
      setFilteredProducts(results);
      
      if (results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  }, [searchInput, products]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = searchInput.trim();
      if (trimmedInput === "") {
        setErrorMessage("Search cannot be empty.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      setErrorMessage("");
    }
  };

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
            onChange={handleInputChange} 
            onKeyDown={handleSearchKeyDown}
            placeholder="Search..."
            className="bg-[#F3F4F5] w-auto py-2 pl-12 pr-10 border rounded-full shadow-lg hover:shadow-xl"
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>

        </div>
      </nav>

      {errorMessage && (
        <div className="text-gray-600 text-center font-mont mt-2">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 max-w-[835px]">
          <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
            Clothes
          </h1>

          {noResults && searchInput.trim() !== "" ? (
            <div className="flex flex-col justify-center gap-4 items-center h-40">
            <p className="font-mont">Product not found</p>
          </div>
          ) : filteredProducts.length === 0 ? (
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
