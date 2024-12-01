'use client'

import Sidebar from "@/src/components/Sidebar";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

interface DashboardContentProps {
  children?: ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState<string>('home'); // State pour gérer la page active

  useEffect(() => {
    if (status === "loading") return;

    setIsLoaded(true);

    // Redirection conditionnelle basée sur le statut de la session
    if (!session) {
      window.location.href = "/auth/signin";
    }
  }, [session, status]);

  if (status === "loading" || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Passer setActivePage à Sidebar pour la gestion de la page active */}
      <Sidebar setActivePage={setActivePage} />
      <main className="flex-1 p-4">
        {/* Afficher le contenu en fonction de la page active */}
        {renderContent(activePage)}
      </main>
    </div>
  );
};

// Fonction pour rendre le contenu en fonction de la page active
const renderContent = (activePage: string) => {
  switch (activePage) {
    case 'home':
      return <div className="text-black dark:text-white">Accueil</div>;
    case 'users':
      return <div className="text-black dark:text-white">Gestion des utilisateurs</div>;
    case 'admin':
      return <div className="text-black dark:text-white">Admin Panel</div>;
    case 'settings':
      return <div className="text-black dark:text-white">Paramètres</div>;
    default:
      return <div className="text-black dark:text-white">Page non trouvée</div>;
  }
};

export default DashboardContent;
