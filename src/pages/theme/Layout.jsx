import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="bg-secondary100 flex flex-col min-h-screen relative">
      <Header />
      <div className="flex flex-grow my-8 px-[8.33%]"> {/* Add top margin and horizontal padding */}
        {/* Sidebar and Outlet in a single flex container */}
        <div className="hidden lg:block lg:w-1/4 relative z-20 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow ml-4 w-full lg:w-3/4"> {/* Add left margin to create gap between Sidebar and Outlet */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


