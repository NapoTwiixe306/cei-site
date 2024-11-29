// app/pages/Dashboard/DashboardContent.tsx
"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
interface DashboardContentProps {
    children?: ReactNode;
  }
  
  const DashboardContent: React.FC<DashboardContentProps> = ({ children }) => {
    const { data: session, status } = useSession();

  // Attendre que la session soit chargée
  useEffect(() => {
    if (status === "loading") return; // Ne rien faire si la session est en cours de chargement

    if (!session) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      window.location.href = "/auth/signin"
    } else if (session.user.role === "admin") {
      // Si l'utilisateur est admin, rediriger vers le dashboard admin
       window.location.href = "/Dashboard/admin"
    } else if (session.user.role === "user") {
      // Si l'utilisateur est un utilisateur, rediriger vers le dashboard utilisateur
       window.location.href = "/Dashboard/user"
    }
  }, [session, status]);

  // Afficher un message pendant le chargement de la session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </header>
    <main className="p-4">
      {children} 
    </main>
  </div>
  );
};

export default DashboardContent;