import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import DynamicForm from "./components/DynamicForm";

const AdminDashboard = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Goods", href: "/goods" },
    { label: "Add Item" }, // No `href` for the current page
  ];

  const sections = [
    {
      title: "General Information",
      fields: [
        { name: "itemName", label: "Item Name", type: "text", placeholder: "Name here..", required: true },
        { name: "description", label: "Description", type: "textarea", placeholder: "Name here..", required: true },
        { name: "tags", label: "Your Tags", type: "text", placeholder: "Tags here.." },
      ],
    },
    {
      title: "Wholesaler & Pricing",
      fields: [
        { name: "wholesaler", label: "Wholesaler", type: "text", placeholder: "Name here..", required: true },
        { name: "costPrice", label: "Cost Price", type: "number", placeholder: "NRs.", required: true },
        { name: "sellingPrice", label: "Selling Price", type: "number", placeholder: "NRs.", required: true },
      ],
    },
    {
      title: "Variants: Colors, Sizes",
      fields: [
        { name: "variants", label: "Number of Variants", type: "number", placeholder: "0.." },
        { name: "sizes", label: "Sizes", type: "text", placeholder: "Sizes here.." },
        { name: "colors", label: "Colors", type: "text", placeholder: "Colors here.." },
      ],
    },
  ];

  const handleGenerateCode = () => {
    console.log("Generate Code Clicked");
  };

  const handleSaveManual = () => {
    console.log("Save Manual Clicked");
  };

  return (
    <div className="p-6">
      <Breadcrumb title="Add Item" links={breadcrumbLinks} />
      <div className="mt-6">
        <DynamicForm
          sections={sections}
          itemCodeActions={{
            onGenerate: handleGenerateCode,
            onSave: handleSaveManual,
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
