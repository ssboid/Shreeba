import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./pages/theme/Layout";
import ProductDetails from "./pages/ProductDetails";
import Goods from "./pages/Goods";
function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          
          
          {/* Protected/Admin Routes within Layout */}
          <Route element={<Layout />}>
            <Route path="/goods" element={<Goods />} />
            <Route path="/product-details" element={<ProductDetails />} />

          </Route>
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
