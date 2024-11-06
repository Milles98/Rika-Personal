import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import {AuthProvider} from "./lib/authorizeRole.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProductsProvider>
        <div>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/customer" element={<CustomerLandingPage />} />
              <Route path="/admin" element={<AdminLandingPage />} />
            </Routes>
          </AuthProvider>
        </div>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
