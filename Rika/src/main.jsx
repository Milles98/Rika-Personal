import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Header from "./views/sections/header/Header";
import ProductDetails from "./views/ProductDetails";
import { PostProductProvider } from "./lib/postProducts";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
      <FetchProductsProvider>
        <PostProductProvider>
        <Header />
        <div className="px-4 pt-10 pb-[86px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetails" element={<ProductDetails />} />
          </Routes>
        </div>
        </PostProductProvider>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
