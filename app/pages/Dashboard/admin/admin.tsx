"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "../DashboardContent";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    } else if (session.user.role?.toLowerCase() !== "admin") {
      router.push("/pages/Dashboard/user");
    }
  }, [session, status, router]);
  

  if (status === "loading" || !session || session.user.role !== "ADMIN") {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContent>
      <div className="">
        <h2 className="text-black dark:text-white text-2xl font-bold">
          Admin Dashboard
        </h2>
        <p className="text-black dark:text-white">
          Bienvenue, {session.user?.email} !
        </p>
      </div>
    </DashboardContent>
  );
};

export default AdminDashboard;
