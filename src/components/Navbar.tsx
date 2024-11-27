"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import LogoBlack from "@/src/img/LogoBlack.svg";
import LogoWhite from "@/src/img/LogoWhite.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return  (
    <nav
      className={`bg-gray-100 dark:bg-gray-900 ${isDarkMode ? "shadow-lg shadow-black" : "shadow-lg shadow-white"}`}
    >
      <div className="px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="block dark:hidden">
                  <Image src={LogoBlack} alt="Logo CEI Light" height={25} />
                </div>
                <div className="hidden dark:block">
                  <Image src={LogoWhite} alt="Logo CEI Dark" height={25} />
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/tutorat"
              className="text-gray-800 text-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-bold"
            >
              Tutorat
            </Link>
            <Link
              href="/evenements"
              className="text-gray-800 text-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-bold"
            >
              Événements
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 focus:outline-none md:hidden"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 pt-2 pb-3 bg-white dark:bg-gray-900">
          <Link
            href="/tutorat"
            className="text-gray-800 text-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-bold"
          >
            Tutorat
          </Link>
          <Link
            href="/evenements"
            className="text-gray-800 text-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-bold"
          >
            Événements
          </Link>
        </div>
      )}
    </nav>
  );
}
