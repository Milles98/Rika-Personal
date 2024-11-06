import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProductsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetails" element={<ProductDetails />} />
          </Routes>
        </div>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
