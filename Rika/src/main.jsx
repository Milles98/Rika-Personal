import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import {AuthProvider} from "./lib/AuthProvider.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";

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

              <Route
                  path="/customer"
                  element={
                    <ProtectedRoute requiredRole="customer">
                      <CustomerLandingPage />
                    </ProtectedRoute>
                  }
              />

              <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLandingPage />
                    </ProtectedRoute>
                  }
              />

            </Routes>
          </AuthProvider>
        </div>
      </FetchProductsProvider>
    </BrowserRouter>
  </StrictMode>
);
