import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="bg-secondary100 min-h-screen flex flex-col">
      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-6">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
