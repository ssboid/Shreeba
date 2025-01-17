import React, { useState } from "react";
import { Switch } from "@material-tailwind/react"; // Import Switch from Material Tailwind
import SalesImg from "../assets/home/sale.png";
import DataImg from "../assets/home/data.png";
import SuccessImg from "../assets/home/success.png";
import Teach from "/src/assets/home/support/1.JPG";
import Billy from "/src/assets/home/support/2.JPG";
import Asclep from "/src/assets/home/support/3.jpg";
import { motion } from "framer-motion";

const Help = () => {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [isNepali, setIsNepali] = useState(false); // Language toggle state

  const toggleLanguage = () => {
    setIsNepali(!isNepali); // Toggle between Nepali and English
  };

  return (
    <div className="help-container font-body text-neutral700  rounded-xl bg-white shadow-xl ">
      <div className="bg-[url('../src/assets/brand/background_mirrored.png')] p-8 bg-orange bg-cover bg-center w-full flex justify-between items-center">
        <h2 className="text-3xl font-bold font-heading text-primary700">
          {isNepali
            ? "व्यवस्थापकको लागि सहायक दस्तावेज"
            : "Help Documentation for Admin"}
        </h2>
        {/* Language Toggle Button */}
        <div className="flex items-center space-x-2">
          <label className="text-lg font-medium">EN</label>
          <Switch
            checked={isNepali}
            onChange={toggleLanguage}
            className="cursor-pointer"
            color="orange"
          />
          <label className="text-lg font-medium">NP</label>
        </div>
      </div>
      <div className="p-8 space-y-12">
        <section className="section mb-6">
          <h3 className="text-xl font-semibold mb-4 text-primaryOrange ">
            {isNepali ? "१. ड्यासबोर्ड अवलोकन" : "1. Dashboard Overview"}
          </h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>{isNepali ? "उद्देश्य" : "Purpose"}</strong>:
              {isNepali
                ? "ड्यासबोर्ड स्टोर सञ्चालनको लागि केन्द्रिय हबको रूपमा काम गर्दछ।"
                : "The dashboard serves as the central hub for managing store operations."}
            </li>
            <li>
              <strong>{isNepali ? "विशेषताहरू" : "Features"}</strong>:
              <ul className="list-disc pl-6">
                <li>
                  {isNepali
                    ? "बिक्री तथ्यांक हेर्नुहोस्"
                    : "View sales statistics"}
                </li>
                <li>
                  {isNepali
                    ? "भण्डारण स्तर निगरानी गर्नुहोस्"
                    : "Monitor inventory levels"}
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="section mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-primaryOrange">
            {isNepali ? "२. वस्तुहरूको व्यवस्थापन" : "2. Managing Goods"}
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <ul className="list-disc pl-6">
              <li>
                <strong>
                  {isNepali ? "नयाँ वस्तु थप्ने" : "Adding New Goods"}
                </strong>
                :
                <ul className="list-disc pl-6">
                  <li>
                    {isNepali
                      ? "‘वस्तुहरू’ सेक्सनमा जानुहोस्।"
                      : "Navigate to the 'Goods' section."}
                  </li>
                  <li>
                    {isNepali
                      ? "'वस्तुहरू थप्नुहोस्' क्लिक गर्नुहोस्।"
                      : "Click on 'Add Goods'."}
                  </li>
                  <li>
                    {isNepali
                      ? "उत्पादन विवरण भर्नुहोस्, जस्तै नाम, वर्णन, मूल्य, र अन्य विवरणहरू।"
                      : "Fill in the product details including name, description, price, and other details."}
                  </li>
                  <li>
                    {isNepali
                      ? "उत्पादनको छवि अपलोड गर्नुहोस् (छविहरू उच्च गुणस्तरका हुनुपर्छ र ५MB भन्दा कम हुनुपर्छ)।"
                      : "Upload product images (ensure images are high quality but under 5MB)."}
                  </li>
                  <li>
                    {isNepali
                      ? "'कोड उत्पन्न गर्नुहोस्' क्लिक गरेर उत्पादन कोड उत्पन्न गर्नुहोस्, वा तपाईं आवश्यक परेमा कोडमा आफ्नै परिवर्तन गर्न सक्नुहुन्छ।"
                      : "Click on 'Generate Code' to generate the product code, or you can make your own changes to the code if needed."}
                  </li>
                  <li>
                    {isNepali
                      ? "'सुरक्षित गर्नुहोस्' क्लिक गरेर उत्पादनलाई सूचीमा थप्नुहोस्।"
                      : "Click 'Save' to add the product to the inventory."}
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  {isNepali
                    ? "अस्तित्वमा रहेका वस्तुहरू सम्पादन गर्ने"
                    : "Editing Existing Goods"}
                </strong>
                :
                <ul className="list-disc pl-6">
                  <li>
                    {isNepali
                      ? "सूचीबाट उत्पादन चयन गर्नुहोस्।"
                      : "Select a product from the list."}
                  </li>
                  <li>
                    {isNepali
                      ? "'सम्पादन गर्नुहोस्' क्लिक गर्नुहोस्।"
                      : "Click on 'Edit'."}
                  </li>
                  <li>
                    {isNepali
                      ? "आवश्यक क्षेत्रहरू अद्यावधिक गर्नुहोस् र 'परिवर्तनहरू सुरक्षित गर्नुहोस्' क्लिक गर्नुहोस्।"
                      : "Update the necessary fields and click 'Save Changes'."}
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  {isNepali ? "वस्तुहरू मेट्ने" : "Deleting Goods"}
                </strong>
                :
                <ul className="list-disc pl-6">
                  <li>
                    {isNepali
                      ? "तपाईं मेट्न चाहनु भएको उत्पादन चयन गर्नुहोस्।"
                      : "Select the product you wish to delete."}
                  </li>
                  <li>
                    {isNepali
                      ? "'मेट्नुहोस्' क्लिक गर्नुहोस् र क्रियालाई पुष्टि गर्नुहोस्।"
                      : "Click on 'Delete' and confirm the action."}
                  </li>
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
                {isNepali ? "३. सूची व्यवस्थापन" : "3. Inventory Management"}
              </h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>
                    {isNepali
                      ? "स्टक स्तर ट्र्याक गर्ने"
                      : "Tracking Stock Levels"}
                  </strong>
                  :
                  <ul className="list-disc pl-6">
                    <li>
                      {isNepali
                        ? "ड्यासबोर्ड नियमित रूपमा जाँच्नुहोस् र स्टक स्तर निगरानी गर्नुहोस्।"
                        : "Regularly check the Dashboard to monitor stock levels."}
                    </li>
                    <li>
                      {isNepali
                        ? "तपाईंले ड्यासबोर्डमा कम स्टकको लागि अलर्ट देख्नुहुनेछ ताकि समयमै पुनः आपूर्ति गर्न सक्नुहुन्छ।"
                        : "You will see alerts on the dashboard graphics for low stock to ensure timely restocking."}
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="section mb-6">
              <h3 className="text-xl font-semibold text-gray-700 text-primaryOrange mb-4">
                {isNepali
                  ? "४. रिपोर्टिङ र विश्लेषण"
                  : "4. Reporting and Analytics"}
              </h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>
                    {isNepali ? "बिक्री रिपोर्ट" : "Sales Reports"}
                  </strong>
                  :
                  <ul className="list-disc pl-6">
                    <li>
                      {isNepali
                        ? "विशिष्ट अवधिहरूमा प्रदर्शन विश्लेषण गर्न बिक्री रिपोर्ट उत्पन्न गर्नुहोस्।"
                        : "Generate sales reports to analyze performance over specific periods."}
                    </li>
                    <li>
                      {isNepali
                        ? "व्यावसायिक निर्णयहरू गर्न दृष्टिकोणहरू प्रयोग गर्नुहोस्।"
                        : "Use insights to make informed business decisions."}
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <section className="section mb-6">
              <h3 className="text-xl font-semibold mb-4 text-primaryOrange ">
                {isNepali
                  ? "५. सेटिङ र कन्फिगरेसन"
                  : "5. Settings and Configuration"}
              </h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>
                    {isNepali ? "प्रयोगकर्ता व्यवस्थापन" : "User Management"}
                  </strong>
                  :
                  <ul className="list-disc pl-6">
                    <li>
                      {isNepali
                        ? "प्रयोगकर्ताहरू थप्नुहोस् वा हटाउनुहोस्।"
                        : "Add or remove users."}
                    </li>
                    <li>
                      {isNepali
                        ? "प्रयोगकर्ता भूमिकाहरूको लागि अनुमतिहरू सेट गर्नुहोस्।"
                        : "Set permissions for different user roles."}
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
            <section className="section mb-6">
              <h3 className="text-xl font-semibold mb-4 text-primaryOrange ">
                {isNepali ? "६. उत्तम अभ्यासहरू" : "6. Best Practices"}
              </h3>
              <ul className="list-disc pl-6">
                <li>
                  {isNepali
                    ? "अनुभव र शुद्धता बढाउन उत्पादन जानकारी र तस्बिरहरू अद्यावधिक राख्नुहोस्।"
                    : "Keep product information and images up to date to enhance experience and accuracy."}
                </li>
                <li>
                  {isNepali
                    ? "नोक्सान हुनबाट जोगाउन नियमित रूपमा भण्डारण डेटाको ब्याकअप लिनुहोस्।"
                    : "Regularly back up store data to prevent loss."}
                </li>
              </ul>
            </section>
          </div>
          <img src={SuccessImg} className="select-none w-1/3 ml-24" />
        </div>

        <div className="space-y-2 pb-12 bg-offwhite">
          <h2 className="flex flex-col space-y-2 text-3xl font-bold font-heading text-primary700 mb-6">
            <div>{isNepali ? "कतै अड्किनु भएको छ?" : "Stuck Somewhere?"}</div>
            <div>
              {isNepali
                ? "हाम्रो सहयोगसँग सम्पर्क गर्नुहोस्!"
                : "Contact our Support!"}
            </div>
          </h2>
          <div>
            <div className="flex flex-col items-center justify-center lg:flex-row lg:mx-0 lg:space-x-4 space-y-16 lg:space-y-0 lg:w-full lg:justify-evenly">
              {/* Teach Image */}
              <motion.div
                className="relative bg-black lg:w-56 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
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
                className="relative bg-white lg:w-56 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
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
                className="relative bg-black lg:w-56 lg:h-96 flex items-center justify-center rounded-full shadow-[0_16px_0_var(--tw-shadow-color)] shadow-primaryOrange w-64 h-72 overflow-hidden"
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
      </div>

      {/* Remaining sections omitted for brevity */}
    </div>
  );
};

export default Help;
