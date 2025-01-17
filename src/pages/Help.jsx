import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SalesImg from "../assets/home/sale.png";
import DataImg from "../assets/home/data.png";
import SuccessImg from "../assets/home/success.png";
import Teach from "/src/assets/home/support/1.JPG";
import Billy from "/src/assets/home/support/2.JPG";
import Asclep from "/src/assets/home/support/3.jpg";

const Help = () => {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  return (
    <div className="help-container font-body text-neutral700 p-8 rounded-xl bg-white shadow-xl space-y-12">
      <h2 className="text-3xl font-bold font-heading text-primary700 mb-6">
        Help Documentation for Admin
      </h2>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold mb-4 text-primaryOrange ">
          1. Dashboard Overview
        </h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Purpose</strong>: The dashboard serves as the central hub
            for managing store operations.
          </li>
          <li>
            <strong>Features</strong>:
            <ul className="list-disc pl-6">
              <li>View sales statistics</li>
              <li>Monitor inventory levels</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-primaryOrange">
          2. Managing Goods
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <ul className="list-disc pl-6">
            <li>
              <strong>Adding New Goods</strong>:
              <ul className="list-disc pl-6">
                <li>Navigate to the "Goods" section.</li>
                <li>Click on "Add Goods".</li>
                <li>
                  Fill in the product details including name, description,
                  price, and other details.
                </li>
                <li>
                  Upload product images (ensure images are high quality but
                  under 5MB).
                </li>
                <li>
                  Click on "Generate Code" to generate the product code, or you
                  can make your own changes to the code if needed.
                </li>
                <li>Click "Save" to add the product to the inventory.</li>
              </ul>
            </li>
            <li>
              <strong>Editing Existing Goods</strong>:
              <ul className="list-disc pl-6">
                <li>Select a product from the list.</li>
                <li>Click on "Edit".</li>
                <li>Update the necessary fields and click "Save Changes".</li>
              </ul>
            </li>
            <li>
              <strong>Deleting Goods</strong>:
              <ul className="list-disc pl-6">
                <li>Select the product you wish to delete.</li>
                <li>Click on "Delete" and confirm the action.</li>
              </ul>
            </li>
          </ul>
          <img src={DataImg} className="select-none w-1/3 ml-24" />
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center justify-between">
      <img src={SalesImg} className="select-none w-1/3 mr-24" />
      
        
        <div>
          <section className="section mb-6">
            <h3 className="text-xl font-semibold text-gray-700 text-primaryOrange mb-4">
              3. Inventory Management
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Tracking Stock Levels</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Regularly check the Dashboard to monitor stock levels.
                  </li>
                  <li>
                    You will see alerts on the dashboard graphics for low stock
                    to ensure timely restocking.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="section mb-6">
            <h3 className="text-xl font-semibold text-gray-700 text-primaryOrange mb-4">
              4. Reporting and Analytics
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Sales Reports</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Generate sales reports to analyze performance over specific
                    periods.
                  </li>
                  <li>Use insights to make informed business decisions.</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <section className="section mb-6">
            <h3 className="text-xl font-semibold text-gray-700 text-primaryOrange mb-4">
              5. Settings and Configuration
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>User Management</strong>:
                <ul className="list-disc pl-6">
                  <li>Add or remove admin users.</li>
                  <li>Set permissions for different user roles.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="section mb-6">
            <h3 className="text-xl font-semibold text-gray-700 text-primaryOrange mb-4">
              6. Best Practices
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Regular Updates</strong>: Keep product information and
                images up to date to enhance experience and accuracy.
              </li>
              <li>
                <strong>Data Backup</strong>: Regularly back up store data to
                prevent loss.
              </li>
            </ul>
          </section>
        </div>
        <img src={SuccessImg} className="select-none w-1/3 ml-24" />
      </div>

      <div className="space-y-2 ">
        <h2 className="flex flex-col space-y-2 text-3xl font-bold font-heading text-primary700 mb-6">
          <div>Stuck Somewhere?</div>
          <div>Contact our Support!</div>
        </h2>
      </div>
      <div>
        <div className="flex mb-16 flex-col items-center justify-center lg:flex-row lg:mx-0 lg:space-x-4 space-y-16 lg:space-y-0 lg:w-full lg:justify-evenly">
          {/* Teach Image */}
          <motion.div
            className="relative bg-black lg:w-64 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
            onMouseEnter={() => setHovered1(true)}
            onMouseLeave={() => setHovered1(false)}
          >
            <img src={Teach} className="w-full h-full object-cover" />
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gray-800 rounded-full bg-opacity-80 flex items-center justify-center text-white z-10"
              initial={{ y: "100%" }}
              animate={{ y: hovered1 ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
              <div className="font-body p-6 text-xl flex flex-col space-y-8 text-center">
                <div className="font-bold">Edward Teach</div>
                <div>
                  <a href="tel:+9812345678" className="hover:underline">
                    981 234 5678
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:ed.teach@email.com"
                    className="hover:underline"
                  >
                    ed.teach@email.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Billy Image */}
          <motion.div
            className="relative bg-white lg:w-64 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
            onMouseEnter={() => setHovered2(true)}
            onMouseLeave={() => setHovered2(false)}
          >
            <img src={Billy} className="w-full h-full object-cover" />
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gray-800 rounded-full bg-opacity-80 flex items-center justify-center text-white z-10"
              initial={{ y: "100%" }}
              animate={{ y: hovered2 ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
              <div className="font-body p-6 text-xl flex flex-col space-y-8 text-center">
                <div className="font-bold">Barnes Billy</div>
                <div>
                  <a href="tel:+9813456789" className="hover:underline">
                    981 345 6789
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:barnbill@email.com"
                    className="hover:underline"
                  >
                    barnbill@email.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Asclep Image */}
          <motion.div
            className="relative bg-black lg:w-64 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
            onMouseEnter={() => setHovered3(true)}
            onMouseLeave={() => setHovered3(false)}
          >
            <img src={Asclep} className="w-full h-full object-cover" />
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gray-800 rounded-full bg-opacity-80 flex items-center justify-center text-white z-10"
              initial={{ y: "100%" }}
              animate={{ y: hovered3 ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
            >
              <div className="font-body p-6 text-xl flex flex-col space-y-8 text-center">
                <div className="font-bold">Aron Asclep</div>
                <div>
                  <a href="tel:+9818765432" className="hover:underline">
                    981 876 5432
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:edward.teach@email.com"
                    className="hover:underline"
                  >
                    edward.teach@email.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;
