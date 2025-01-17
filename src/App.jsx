import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import './App.css';

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./pages/theme/Layout";
import HomepageLayout from "./pages/theme/HomepageLayout";
import ProductDetails from "./pages/ProductDetails";
import Product from "./pages/Product";
import Goods from "./pages/Goods";
import Homepage from "./pages/Homepage";
import Wholesalers from "./pages/Wholesalers";
import Accounts from "./pages/Accounts";

import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import { Toaster } from "react-hot-toast";
import EditGoodForm from "./pages/components/EditGoodForm";
import UserDashboard from "./pages/user/UserDashboard";
import UserGoods from "./pages/user/UserGoods";
import UserProducts from "./pages/user/UserProducts";
import UserSales from "./pages/user/UserSales";

// Define the sections array
const sections = [
  {
    title: "General Information",
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Enter item name", required: true },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
    ],
  },
  {
    title: "Wholesaler & Pricing",
    fields: [
      { name: "costPrice", label: "Cost Price", type: "number", placeholder: "Enter cost price", required: true },
      { name: "markedPrice", label: "Marked Price", type: "number", placeholder: "Enter marked price", required: true },
    ],
  },
  {
    title: "Variants",
    fields: [
      { name: "color", label: "Color", type: "text", placeholder: "Enter color" },
      { name: "size", label: "Size", type: "text", placeholder: "Enter size" },
    ],
  },
];

// Protected route wrapper for logged-in users
const ProtectedRoute = ({ children }) => {
  const isLogin = Cookies.get("isLogin") === "true"; // Check login status
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Admin-only route wrapper
const AdminRoute = ({ children }) => {
  const role = Cookies.get("role"); // Check user role
  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Toaster className="z-40" position="top-center" reverseOrder={false} />
        </div>

        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Homepage with Header and Footer only */}
          <Route element={<HomepageLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>

          {/* Protected Routes within Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Admin-specific routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goods" element={<Goods />} />
            <Route path="/wholesalers" element={<Wholesalers />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/help" element={<Help />} />
            <Route path="/edit-good/:id" element={<EditGoodForm sections={sections} />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />

            {/* User-specific routes */}
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user-goods" element={<UserGoods/>} />
            <Route path="/user-sales" element={<UserSales/>} />
            <Route path="/user-help" element={<div>Help</div>} />
            <Route path="/goods-details/:id" element={<UserProducts />} />

          </Route>

          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;