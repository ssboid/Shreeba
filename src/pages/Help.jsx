import React, { useState, useEffect } from "react";


const Help = () => {


  return (
    <div className="help-container p-8 rounded-xl bg-white shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Help Documentation for Admin/Store Owner Side</h2>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">1. Dashboard Overview</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Purpose</strong>: The dashboard serves as the central hub for managing store operations.
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
        <h3 className="text-xl font-semibold text-gray-700 mb-4">2. Managing Products</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Adding New Goods</strong>:
            <ul className="list-disc pl-6">
              <li>Navigate to the "Goods" section.</li>
              <li>Click on "Add Goods".</li>
              <li>Fill in the product details including name, description, price, and other details.</li>
              <li>Upload product images (ensure images are high quality but under 5MB).</li>
              <li>Click on "Generate Code" to generate the product code, or you can make your own changes to the code if needed.</li>
              <li>Click "Save" to add the product to the inventory.</li>
            </ul>
          </li>
          <li>
            <strong>Editing Existing Products</strong>:
            <ul className="list-disc pl-6">
              <li>Select a product from the list.</li>
              <li>Click on "Edit".</li>
              <li>Update the necessary fields and click "Save Changes".</li>
            </ul>
          </li>
          <li>
            <strong>Deleting Products</strong>:
            <ul className="list-disc pl-6">
              <li>Select the product you wish to delete.</li>
              <li>Click on "Delete" and confirm the action.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">3. Inventory Management</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Tracking Stock Levels</strong>:
            <ul className="list-disc pl-6">
              <li>Regularly check the Dashboard to monitor stock levels.</li>
              <li>You will see alerts on the dashboard graphics for low stock to ensure timely restocking.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">4. Reporting and Analytics</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Sales Reports</strong>:
            <ul className="list-disc pl-6">
              <li>Generate sales reports to analyze performance over specific periods.</li>
              <li>Use insights to make informed business decisions.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="section mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">5. Settings and Configuration</h3>
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
        <h3 className="text-xl font-semibold text-gray-700 mb-4">6. Best Practices</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Regular Updates</strong>: Keep product information and images up to date to enhance experience and accuracy.
          </li>
          <li>
            <strong>Data Backup</strong>: Regularly back up store data to prevent loss.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
