"use client";

import { useSession } from "next-auth/react";
import DashboardContent from "../DashboardContent";

const AdminDashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardContent>
        <div className="ml-64 dark:bg-gray-800">  {/* ml-20 pour petite taille, ml-64 pour grande taille */}
          <h2 className="text-black dark:text-white text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-black dark:text-white">Bienvenue, {session.user?.email} !</p>
        </div>

      </DashboardContent>
    </>
  );
};

export default AdminDashboard;
