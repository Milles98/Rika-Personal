import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/css/main.css";

import Home from "./views/Home";
import ProductEdit from "./views/admin/ProductEdit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/admin/edit-product/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
