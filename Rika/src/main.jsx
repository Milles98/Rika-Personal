import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";
import { FetchUsersProvider } from "./lib/fetchUsers";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Users from "./views/Users";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <FetchUsersProvider>
      <FetchProductsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </FetchProductsProvider>      
    </FetchUsersProvider>
    </BrowserRouter>
  </StrictMode>
);
