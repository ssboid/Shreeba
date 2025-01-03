import React, { useRef } from "react";
import BannerIso from "../assets/home/banneriso.png";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaSearch,
  FaPlusCircle,
  FaFilter,
  FaTag,
} from "react-icons/fa";

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
        className="h-screen -mb-32 lg:-mb-16 w-full  flex flex-col md:flex-row items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/brand/background_mirrored.png')",
        }}
      >
        <div className=" md:h-full w-full md:w-1/2  flex flex-col p-6 xl:p-[8.33%] xl:py-[12%] items-start justify-start space-y-12">
          <h1 className="font-heading font-bold text-5xl text-primary1000">
            Easy Inventory Management
          </h1>
          <p className="font-body text-xl">
            Manage your store easily. Add, edit, and track items with a few
            clicks. Log in now and simplify your work today!
          </p>
          <button
            type="button"
            className="bg-primaryOrange text-white rounded-full px-6 py-4 hover:bg-opacity-90"
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
        className=" w-full bg-orange-100 flex flex-col md:flex-row items-center justify-center py-12 pb-16 lg:py-0 "
      >
        <div className="md:h-full w-full md:w-1/2  flex flex-col p-6 pt-0   xl:p-[8.33%]  flex items-start justify-start space-y-12">
          <div className="space-y-2">
            <span className="text-primaryOrange">FOR YOUR BUSINESS NEED</span>
            <h2 className="font-heading font-bold text-primary1000 text-4xl">
              Easy Inventory Management
            </h2>
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
        <div className=" md:flex md:h-full w-full md:w-1/2 items-center xl:p-[8.33%] justify-center px-24 lg:px-32">
          <div className="flex  space-x-8 w-full justify-center ">
            <div className="flex mx-6 lg:mx-0 space-x-4 justify-center">
              <div className="bg-black lg:w-52 lg:h-96 flex items-center justify-center mt-16 rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-40 h-72">
                QW
              </div>
              <div className="bg-white lg:w-52 lg:h-96 flex items-center justify-center mb-16 rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-40 h-72">
                EQ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Div3 */}
      <div
        ref={div3Ref}
        className=" w-full flex flex-col items-center justify-start p-6 py-12 pb-16 lg:py-0 xl:p-[8.33%] bg-secondary100 space-y-16"
      >
        <div className="flex flex-col space-y-2 items-center justify-center text-center">
          <span className="text-primaryOrange">COMPLETE INVENTORY CONTROL</span>
          <h2 className="font-heading font-bold text-primary1000 text-4xl">
            What does it Do?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-18 gap-y-16">
          {[
            {
              title: "Add Records",
              description: "Easily input new inventory details",
              icon: <FaPlusCircle className="text-3xl text-primaryOrange" />,
            },
            {
              title: "Edit Records",
              description: "Update existing records with new information",
              icon: <FaPencilAlt className="text-3xl text-primaryOrange" />,
            },
            {
              title: "View",
              description: "Access all inventory details in one place",
              icon: <FaSearch className="text-3xl text-primaryOrange" />,
            },
            {
              title: "Delete Records",
              description: "Remove items that are no longer needed",
              icon: <FaTrashAlt className="text-3xl text-primaryOrange" />,
            },
            {
              title: "Generate Unique Codes",
              description:
                "Create a unique code for each item using entered details",
              icon: <FaTag className="text-3xl text-primaryOrange" />,
            },
            {
              title: "Filter Records",
              description:
                "Search through inventory with various filters for quick access",
              icon: <FaFilter className="text-3xl text-primaryOrange" />,
            },
            {
              title: "Record and Track Sales",
              description:
                "Mark items as sold by searching with their unique code",
              icon: <FaTag className="text-3xl text-primaryOrange" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center px-8 text-center ${
                index === 6
                  ? "md:col-span-3 md:flex md:justify-center"
                  : "md:flex-1 px-8"
              }`}
            >
              <div className="mb-4">{item.icon}</div>
              <div className="space-y-2">
                <div className="font-heading font-semibold text-primary1000">
                  {item.title}
                </div>
                <div className="font-body text-neutral700 ">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Div4 */}
      <div
        ref={div4Ref}
        className="bg-orange-100 lg:min-h-screen space-y-16 w-full flex flex-col flex p-6 xl:p-[8.33%] py-12 pb-16 lg:py-0 "
      >
        <div className="space-y-2">
          <span className="text-primaryOrange">WE'RE HERE TO HELP</span>
          <h2 className="flex flex-col font-heading font-bold text-primary1000 text-4xl space-y-2">
            <div>Stuck Somewhere?</div>
            <div>Contact our team!</div>
          </h2>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row lg:mx-0 lg:space-x-4 space-y-16 lg:space-y-0 lg:w-full lg:justify-evenly">
            <div className="bg-black lg:w-52 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-40 h-72">
              QW
            </div>
            <div className="bg-white lg:w-52 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-40 h-72">
              EQ
            </div>
            <div className="bg-black lg:w-52 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-40 h-72">
              QW
            </div>
          </div>
        </div>
      </div>

      {/* Div5 */}
      <div
        ref={div5Ref}
        className="w-full flex flex-col items-center justify-start p-6 py-12 pb-16 lg:py-0 xl:p-[8.33%] bg-secondary100 space-y-16"
        style={{
          backgroundImage: "url('src/assets/brand/background.png')",
          backgroundSize: "cover", // Ensures the background image covers the entire container
          backgroundPosition: "center", // Ensures the background is centered
          backgroundRepeat: "no-repeat", // Prevents the background from repeating
        }}
      >
        <div className="text-center flex flex-col items-center justify-center space-y-12">
          <div className="flex flex-col space-y-2">
            <span className="text-primaryOrange text-center">OUR PURPOSE</span>
            <h2 className="flex flex-col font-heading font-bold text-primary1000 text-4xl space-y-2 text-center">
              Manage Smarter Today!
            </h2>
          </div>
          <div className="flex flex-col space-y-4">
            <span>
              Ready to take control of your inventory? Log in now to get
              started!
            </span>
            <button
              type="button"
              className="bg-primaryOrange text-white rounded-full px-6 py-4 hover:bg-opacity-90 self-center" // Added self-center to center the button
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
