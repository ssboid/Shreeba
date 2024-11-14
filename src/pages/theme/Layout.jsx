import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="bg-secondary100  flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow h-screen p-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
