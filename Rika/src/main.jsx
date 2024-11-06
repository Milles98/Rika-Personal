import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FetchProductsProvider } from "./lib/fetchProducts";
import { PostProductProvider } from "./lib/postProducts";
import { AuthProvider } from "./lib/authorizeRole.jsx";

import "./assets/css/main.css";

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";
import Header from "./views/sections/header/Header";
import ProductDetails from "./views/ProductDetails";
import CreateProduct from "./views/CreateProduct";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
     <AuthProvider>
      <FetchProductsProvider>
       <PostProductProvider>
        <Header />
        <div className="px-4 pt-10 pb-[86px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer" element={<CustomerLandingPage />} />
            <Route path="/admin" element={<AdminLandingPage />} />
            <Route path="/productscreate" element={<CreateProduct />} />
          </Routes>
        </div>
       </PostProductProvider>
      </FetchProductsProvider>
     </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
