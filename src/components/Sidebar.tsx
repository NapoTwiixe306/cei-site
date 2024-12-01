'use client'

import React, { useState, useEffect } from 'react'
import { Home, Settings, Users, LogOut, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
    const {data: session} = useSession();
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
                <h1>Bienvenue, <span>{session?.user.name}</span></h1>
            </span>
          </div>
          <nav>
            <SidebarItem icon={<Home size={24} />} text="Accueil" href="/" expanded={isExpanded} />
            <SidebarItem icon={<Users size={24} />} text="Utilisateurs" href="/users" expanded={isExpanded} />
            <SidebarItem icon={<Settings size={24} />} text="Paramètres" href="/settings" expanded={isExpanded} />
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
            onClick={() => console.log('Déconnexion')}
            className="flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <LogOut size={24} />
            <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  href: string
  expanded: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, href, expanded }) => {
  return (
    <Link href={href} className="mb-4 flex items-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
      {icon}
      <span className={`ml-2 ${expanded ? 'block' : 'hidden'}`}>{text}</span>
    </Link>
  )
}

export default Sidebar

