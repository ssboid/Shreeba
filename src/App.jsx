import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./pages/theme/Layout";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          
          {/* Protected/Admin Routes within Layout */}
          <Route element={<Layout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
