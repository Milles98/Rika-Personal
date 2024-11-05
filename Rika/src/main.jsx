import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/sections/loginpage/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProductsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
