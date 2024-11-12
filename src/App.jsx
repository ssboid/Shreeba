import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
