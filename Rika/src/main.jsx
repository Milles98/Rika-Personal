import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./lib/AuthProvider.jsx";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import { ProductProvider } from "./lib/ProductProvider.jsx";

import "./assets/css/main.css";

import Header from "./views/sections/header/Header";
import Home from "./views/Home";
import PaymentForm from "./views/payment/PaymentForm";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";
import EditProduct from "./views/EditProduct";
import CreateProduct from "./views/CreateProduct";
import Users from "./views/Users";
import Register from "./views/Register.jsx"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Header />
          <div className="px-4 pt-10 pb-[86px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productscreate" element={<CreateProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/users" element={<Users />} />
              <Route path="/register" element={<Register />} />
              <Route path="/paymentform" element={<PaymentForm />} /> 
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
          </div>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
