import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="bg-secondary100 flex relative">
      {/* Sidebar with higher z-index */}
      <div className="relative z-20">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow h-screen p-6">
          <div className="relative">
            {/* Transparent Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-20 pointer-events-none z-0"></div>
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
