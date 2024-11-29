"use client";

import DashboardContent from "../DashboardContent";

const AdminDashboard = () => {
  return (
    <DashboardContent>
      <h2 className="text-black dark:text-white text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-black dark:text-white">Bienvenue, administrateur !</p>
    </DashboardContent>
  );
};

export default AdminDashboard;