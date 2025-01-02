import React, { useRef } from "react";
import BannerIso from "../assets/home/banneriso.png";
import { FaPencilAlt } from "react-icons/fa";

const Homepage = () => {
  // Refs to each div
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);

  // Handle the scroll event
  const handleScroll = (e) => {
    // Prevent default scrolling behavior
    e.preventDefault();

    // Determine scroll direction
    const direction = e.deltaY > 0 ? "down" : "up";

    // Check which div to scroll to based on the direction
    if (direction === "down") {
      if (div1Ref.current && window.scrollY < div2Ref.current.offsetTop) {
        div2Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div2Ref.current &&
        window.scrollY < div3Ref.current.offsetTop
      ) {
        div3Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div3Ref.current &&
        window.scrollY < div4Ref.current.offsetTop
      ) {
        div4Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div4Ref.current &&
        window.scrollY < div5Ref.current.offsetTop
      ) {
        div5Ref.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (direction === "up") {
      if (div5Ref.current && window.scrollY >= div4Ref.current.offsetTop) {
        div4Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div4Ref.current &&
        window.scrollY >= div3Ref.current.offsetTop
      ) {
        div3Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div3Ref.current &&
        window.scrollY >= div2Ref.current.offsetTop
      ) {
        div2Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        div2Ref.current &&
        window.scrollY >= div1Ref.current.offsetTop
      ) {
        div1Ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="w-full"
      onWheel={handleScroll} // Listen for scroll wheel events
    >
      {/* Div1 */}
      <div
        ref={div1Ref}
        className="h-screen w-full  flex flex-col md:flex-row items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/brand/background_mirrored.png')",
        }}
      >
        <div className=" md:h-full w-full md:w-1/2  flex flex-col p-6 xl:p-[8.33%] xl:py-[12%] items-start justify-start space-y-12">
          <h1 className="font-heading font-bold text-5xl text-primary1000">Easy Inventory Management</h1>
          <p className="font-body text-xl">
            Manage your store easily. Add, edit, and track items with a few
            clicks.
            Log in now and simplify your work today!
          </p>
          <button
            type="button"
            className="bg-primaryOrange text-white rounded-full px-4 py-2 hover:bg-opacity-90"
          >
            Get Started
          </button>
        </div>
        <div className="h-screen md:h-full w-full md:w-1/2 flex items-start justify-start px-4 pr-12 xl:py-[3.5%]">
          <img src={BannerIso} className="select-none" />
        </div>
      </div>

      {/* Div2 */}
      <div
        ref={div2Ref}
        className="h-screen w-full bg-sky-200 flex flex-col md:flex-row items-center justify-center"
      >
        <div className="h-screen md:h-full w-full md:w-1/2 bg-orange-100 flex flex-col p-6 xl:p-[8.33%]  flex items-start justify-start space-y-12">
          <div className="space-y-2">
            <span>FOR YOUR BUSINESS NEED</span>
            <h2 className="font-heading font-bold text-primary1000 text-4xl">Easy Inventory Management</h2>
          </div>
          <span>
            By providing a seamless way to add, edit, delete, and view inventory
            records, we aim to help businesses save time and reduce errors. Our
            automated code generation feature ensures each item is uniquely
            identifiable. With powerful filtering options, managing and
            searching through records becomes efficient and hassle-free.
            Additionally, the system allows for efficient tracking of sold items
            through unique codes.
          </span>
        </div>
        <div className="hidden md:flex h-screen md:h-full w-full md:w-1/2 bg-green-500 items-center justify-center">
          <h1 className="text-5xl">2B</h1>
        </div>
      </div>

      {/* Div3 */}
      <div
        ref={div3Ref}
        className="h-screen w-full flex flex-col items-center justify-start p-6 xl:p-[8.33%] bg-secondary100 space-y-24"
      >
        <div className="lex flex-col space-y-2 items-center justify-center text-center">
          <span>COMPLETE INVENTORY CONTROL</span>
          <h2 className="text-4xl">What We Do</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          <div
            className="bg-gray-200 rounded shadow flex items-center justify-center space-x-6
          "
          >
            <div className=""><FaPencilAlt className="text-2xl text-primaryOrange" /></div>
            <div className="space-y-2">
              <div>Add Records</div>
              <div>Easily input new inventory details</div>
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">Item 2</div>
          <div className="bg-gray-200 p-4 rounded shadow">Item 3</div>
          <div className="bg-gray-200 p-4 rounded shadow">Item 4</div>
          <div className="bg-gray-200 p-4 rounded shadow">Item 5</div>
          <div className="bg-gray-200 p-4 rounded shadow">Item 6</div>
          <div className="bg-gray-200 p-4 rounded shadow md:col-span-3 md:mx-auto">
            Item 7
          </div>
        </div>
      </div>

      {/* Div4 */}
      <div
        ref={div4Ref}
        className="h-screen w-full bg-sky-400 flex items-center justify-center"
      >
        <h1 className="text-9xl">4</h1>
      </div>

      {/* Div5 */}
      <div
        ref={div5Ref}
        className="h-screen w-full bg-sky-500 flex items-center justify-center"
      >
        <h1 className="text-9xl">5</h1>
      </div>
    </div>
  );
};

export default Homepage;
