"use client";
import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import { GraduationCap, HelpCircle, Calendar, Users } from "lucide-react";

const textData = [
  {
    icon: <GraduationCap className="w-8 h-8 text-black dark:text-white" />,
    title: "Orientation première année",
    description:
      "Obtenez de l'aide pour vos premiers pas dans l'enseignement supérieur.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-black dark:text-white" />,
    title: "Planification de l'emploi du temps",
    description:
      "Apprenez à gérer efficacement vos cours et votre temps d'étude.",
  },
  {
    icon: <HelpCircle className="w-8 h-8 text-black dark:text-white" />,
    title: "Clarification des concepts",
    description:
      "Obtenez de l'aide pour comprendre les concepts difficiles des cours.",
  },
  {
    icon: <Users className="w-8 h-8 text-black dark:text-white" />,
    title: "Soutien par les pairs",
    description:
      "Connectez-vous avec des étudiants qui ont suivi les mêmes cours.",
  },
];

export default function Mentorat() {
  const [departement, setDepartement] = useState("");
  const [activeTab, setActiveTab] = useState<"mentore" | "mentor">("mentore");

  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-800 min-h-screen flex flex-col md:flex-row justify-center items-center p-4 gap-6">
        {/* Section gauche */}
        <div className="left w-full md:w-1/2 p-4">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl text-black dark:text-white text-center md:text-left">
              Programme de Tutorat
            </h1>
            <p className="text-lg md:text-xl mt-3 text-gray-400 text-center md:text-left">
              Obtenez de l&#39;aide d&#39;étudiants expérimentés ou devenez
              mentor vous-même. Rejoignez notre communauté d&#39;apprenants!
            </p>
          </div>
          <ul className="mt-6 space-y-4">
            {textData.map((item, index) => (
              <li
                key={index}
                className="flex items-start space-x-4 bg-white dark:bg-gray-500 border-2 border-gray-400 p-4 shadow-lg rounded-lg dark:shadow-white dark:shadow-md"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black dark:text-white">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Section droite */}
        <div className="right w-full md:w-2/5 bg-white dark:bg-gray-700 border-2 border-gray-400 p-4 rounded-md">
          <div>
            <h1 className="font-bold text-xl text-black dark:text-white text-center md:text-left">
              Inscrivez-vous maintenant!
            </h1>
            <p className="text-md mt-3 text-gray-400 text-center md:text-left">
              Choisissez votre rôle dans le programme de Tutorat
            </p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2 bg-gray-200 border-2 border-gray-400 rounded-md">
              <button
                className={`flex-1 py-2 px-4 text-center rounded-md ${
                  activeTab === "mentore"
                    ? "bg-white text-black dark:text-black"
                    : "bg-muted text-gray-400"
                }`}
                onClick={() => setActiveTab("mentore")}
              >
                J&#39;ai besoin d&#39;aide (B1)
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center rounded-md ${
                  activeTab === "mentor"
                    ? "bg-white text-black dark:text-black"
                    : "bg-muted text-gray-400"
                }`}
                onClick={() => setActiveTab("mentor")}
              >
                Je veux aider (B2/B3)
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 h-10 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Entrez votre nom complet"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Votre adresse e-mail HELMo
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 h-10 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="votre.nom@student.helmo.be"
                />
              </div>
              <div>
                <label
                  htmlFor="discord"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Nom d&#39;utilisateur Discord (optionnel)
                </label>
                <input
                  type="text"
                  id="discord"
                  className="mt-1 h-10 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="utilisateur#0000"
                />
              </div>
              <div>
                <label
                  htmlFor="departement"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Votre département
                </label>
                <select
                  id="departement"
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                  className="mt-1 h-10 p-2 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="">Sélectionnez votre département</option>
                  <option value="apps">
                    Développement d&#39;applications / programmation
                  </option>
                  <option value="networks">Réseaux et sécurité</option>
                  <option value="systems">Systèmes d&#39;exploitation</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 dark:hover:bg-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {activeTab === "mentore"
                  ? "S'inscrire comme mentoré"
                  : "S'inscrire comme mentor"}
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Vos données ne seront pas partagées et seront uniquement utilisées
              pour le programme de Tutorat
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
