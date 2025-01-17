import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/adminApi";
import { loginUser } from "../services/adminApi";
import Cookies from "js-cookie";
import { showToast } from "../utils/toastUtils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("Testing Cookies:", Cookies);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      console.log("Attempting login with:", username, password);
      const response = await loginUser(username, password); // Send credentials to backend
      console.log("Login successful, role:", response.role);
  
      // Set cookies after successful login
      const expiryTimeInDays = 3600 / (24 * 60 * 60); // 10 seconds as a fraction of a day
      Cookies.set('isLogin', true, { expires: expiryTimeInDays });
      Cookies.set('role', response.role, { expires: expiryTimeInDays });
      Cookies.set('id', response.id, { expires: expiryTimeInDays });

      console.log("Cookies set: isLogin and role");
  
      // Show success toast
      showToast("Login successful!", "success");
  
      // Navigate based on user role
      if (response.role === "admin") {
        navigate("/dashboard");
      } else if (response.role === "user") {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login failed:", err);
  
      // Show failure toast
      showToast("Username and Password Error", "error");
  
      setError(err.error || "Invalid username or password");
    }
  };
  

  return (
    <div>
      <section className="bg-white w-full">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 lg:gap-x-4 w-full">
          <aside className="relative block h-72 lg:order-first w-full lg:col-span-5 lg:h-full xl:col-span-6 order-2 lg:order-1 overflow-hidden">
            <img
              alt=""
              src="src/assets/brand/Cover.png"
              className="absolute inset-0 w-full object-top object-cover"
            />
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl w-96 max-w-full mx-auto">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Login
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>

              <form
                onSubmit={handleLogin}
                className="mt-8 gap-6 flex flex-col justify-start w-96 max-w-full mx-auto"
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
                    className="inline-block shrink-0 rounded-md border border-primaryOrange bg-primaryOrange px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primaryOrange focus:outline-none focus:ring active:text-blue-500"
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
