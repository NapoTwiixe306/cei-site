"use client";

import Sidebar from "@/src/components/Sidebar";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

interface DashboardContentProps {
  children?: ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    setIsLoaded(true);

    if (!session) {
      window.location.href = "/auth/signin";
    } else if (session.user.role === "admin") {
      window.location.href = "/Dashboard/admin";
    } else if (session.user.role === "user") {
      window.location.href = "/Dashboard/user";
    }
  }, [session, status]);

  if (status === "loading" || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardContent;
