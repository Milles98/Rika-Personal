import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/sections/loginpage/Login.jsx";
import CustomerLoggedIn from "./views/sections/loginpage/CustomerLoggedIn.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProductsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CustomerLoggedIn" element={<CustomerLoggedIn />} />
          </Routes>
        </div>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
