import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./pages/theme/Layout";
import HomepageLayout from "./pages/theme/HomepageLayout";
import ProductDetails from "./pages/ProductDetails";
import Goods from "./pages/Goods";
import Homepage from "./pages/Homepage";
import Wholesalers from "./pages/Wholesalers";
import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
function App() {
  return (
    <div>
      <BrowserRouter>

      <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Homepage with Header and Footer only */}
          <Route element={<HomepageLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>

          {/* Protected/Admin Routes within Layout */}
          <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/goods" element={<Goods />} />
            
            <Route path="/wholesalers" element={<Wholesalers/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/help" element={<Help/>} />



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
