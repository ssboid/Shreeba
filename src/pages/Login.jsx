import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/adminApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      "Login attempt with username:",
      username,
      "and password:",
      password
    );

    try {
      const users = await getUsers();
      console.log("Fetched users data:", users); // Log users data

      const user = users.find(
        (u) => u.userName === username && u.userPassword === password
      );

      console.log("User found:", user); // Log if a user is found or not

      if (user) {
        console.log("Login successful, navigating to /admin-dashboard");
        navigate("/home");
      } else {
        console.log("Invalid username or password");
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <section className="bg-white w-full">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 lg:gap-x-4 w-full">
          {" "}
          {/* Add gap-x-4 to create space between columns */}
          <aside className="relative block h-72 lg:order-first w-full lg:col-span-5 lg:h-full xl:col-span-6 order-2 lg:order-1 overflow-hidden">
            <img
              alt=""
              src="src\assets\brand\Cover.png"
              className="absolute inset-0 w-full object-top object-cover"
            />
          </aside>
          <main className="flex items-center justify-center px-8 py-6 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6">
            {" "}
            {/* Adjust column span to 6 for 5 columns grid with margin */}
            <div className="max-w-xl lg:max-w-3xl w-full max-w-full flex flex-col space-y-8 mx-auto">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                {/* SVG Icon */}
              </a>
              <div>
                <h1 className="mt-6 text-3xl text-neutral700 font-heading font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Your Business,
                </h1>
                <h1 className="mt-2 text-3xl text-neutral700 font-heading font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Your Control
                </h1>
              </div>

              <p className="font-body leading-relaxed text-gray-500 lg:pr-24">
                Log in to dive into your store management tools and analytics,
                efficiently oversee your operations and make informed decisions
                to drive your business forward.
              </p>

              <form
                onSubmit={handleLogin}
                className="gap-6 flex flex-col justify-start w-96 w-full lg:pr-24 max-w-full mx-auto" // Set width and center it
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full focus:outline-none h-10 md:h-10 lg:h-12 p-2.5 rounded-md bg-white text-sm text-gray-700 shadow-sm border border-borderDefault focus:border-primaryOrange"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full focus:outline-none  h-10 md:h-10 lg:h-12 p-2.5 rounded-md bg-white text-sm text-gray-700 shadow-sm border border-borderDefault focus:border-[#DE761C]"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md mt-8 border border-primaryOrange bg-primaryOrange px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primaryOrange focus:outline-none focus:ring active:text-blue-500"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
