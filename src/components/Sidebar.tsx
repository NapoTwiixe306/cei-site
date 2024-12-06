'use client'

import React, { useState, useEffect } from 'react'
import { Home, Settings, Users, LogOut, Moon, Sun, Shield, Tickets } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
const Sidebar = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const { data: session } = useSession()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode')
    setIsDarkMode(darkModePreference === 'true')
    if (darkModePreference === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleSidebar = () => setIsExpanded(!isExpanded)
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark')
  }

  // Récupérer le rôle
  const role = session?.user?.role

  // Fonction pour changer de page active
  const handleSetActivePage = (page: string) => {
    setActivePage(page)
  }



  return (
    <div
      className={`relative left-0 top-0 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } hover:w-64 shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-8 flex items-center justify-center">
            <span className={`text-2xl font-bold ${isExpanded ? 'block' : 'hidden'}`}>
              Bienvenue, <span>{session?.user?.name}</span>
            </span>
          </div>
          <nav>
            <SidebarItem icon={<Home size={24} />} text="Accueil" onClick={() => handleSetActivePage('home')} expanded={isExpanded} />
            
            {role === 'ADMIN' && (
              <>
                <SidebarItem icon={<Tickets size={24} />} text="Gestion d'évenements" onClick={() => handleSetActivePage('event')} expanded={isExpanded} />
                <SidebarItem icon={<Users size={24} />} text="Gestion des utilisateurs" onClick={() => handleSetActivePage('users')} expanded={isExpanded} />
                <SidebarItem icon={<Shield size={24} />} text="Admin Panel" onClick={() => handleSetActivePage('admin')} expanded={isExpanded} />
              </>
            )}

            {role === 'USER' && (
              <>
                <SidebarItem icon={<Settings size={24} />} text="Paramètres" onClick={() => handleSetActivePage('settings')} expanded={isExpanded} />
              </>
            )}
          </nav>
        </div>
        <div>
          <button
            onClick={toggleDarkMode}
            className="mb-4 flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>
              {isDarkMode ? 'Mode clair' : 'Mode sombre'}
            </span>
          </button>
          <button
            className="flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <LogOut size={24} />
            <Link href='/auth/signout' className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Déconnexion</Link>

          </button>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
  expanded: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick, expanded }) => {
  return (
    <button
      onClick={onClick}
      className="mb-4 flex items-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
    >
      {icon}
      <span className={`ml-2 ${expanded ? 'block' : 'hidden'}`}>{text}</span>
    </button>
  )
}

export default Sidebar
