import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HomepageLayout = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // User is scrolling down
        setScrollingDown(true);
      } else {
        // User is scrolling up
        setScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="bg-secondary100 flex flex-col min-h-screen relative">
      {/* Pass scrollingDown state to Header component */}
      <Header scrollingDown={scrollingDown} />
      <div className="flex flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
