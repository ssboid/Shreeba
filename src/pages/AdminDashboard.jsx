import React from "react";
import Breadcrumb from "./components/Breadcrumb";
const AdminDashboard = () => {
  const breadcrumbLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Goods', href: '/goods' },
    { label: 'Add Item' }, // No `href` for the current page
  ];

  return (
    <div className="p-6">
      <Breadcrumb title="Add Item" links={breadcrumbLinks} />
    </div>
  );
};

export default AdminDashboard;
