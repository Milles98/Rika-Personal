import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./lib/AuthProvider.jsx";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import { ProductProvider } from "./lib/ProductProvider.jsx";
import { ShippingProvider } from "./lib/ShippingOptionsProvider.jsx";

import "./assets/css/main.css";

import Header from "./views/sections/header/Header";
import Home from "./views/Home";
import ReturnFromPayment from "./views/payment/ReturnFromPayment";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";
import EditProduct from "./views/EditProduct";
import CreateProduct from "./views/CreateProduct";
import Users from "./views/Users";
import RedirectToPaymentForm from "./views/payment/RedirectToPaymentForm.jsx";
import Register from "./views/Register.jsx";
import AllInvoices from "./views/AllInvoices";

import ShippingOptions from "./views/Checkout/ShippingOptions.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <ShippingProvider>
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
                <Route path="/paymentformtest" element={<RedirectToPaymentForm />} />
                <Route path="/shipping" element={<ShippingOptions />} />
                <Route path="/return" element={<ReturnFromPayment />} />
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
                <Route
                  path="/all-invoices"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AllInvoices />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </ShippingProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);