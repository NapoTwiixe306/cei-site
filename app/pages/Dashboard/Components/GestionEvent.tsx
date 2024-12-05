'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: {
    name: string;
  };
}

export default function GestionEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [logs, setLogs] = useState<string[]>([]); // État pour stocker les logs

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Erreur de récupération des événements');
        const data = await res.json();
        setEvents(data);
        addLog('Événements chargés avec succès.');
      } catch (error) {
        addLog('Erreur lors du chargement des événements.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  function addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [`[${timestamp}] ${message}`, ...prevLogs]);
  }

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function closeModal() {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setDate('');
  }

  function handleEventClick(event: Event) {
    setSelectedEvent(event);
    addLog(`Événement sélectionné : ${event.title}`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = new Date(date).toISOString();
    const eventData = { title, description, date: formattedDate };

    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
      }

      const data = await response.json();
      setEvents((prev) => [...prev, data]);
      addLog(`Événement créé : ${data.title}`);
      closeModal();
    } catch (error) {
      addLog('Erreur lors de la création de l\'événement.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="title flex justify-between">
          <h1 className="text-black dark:text-white font-bold text-4xl">Gestion des Événements</h1>
          <button
            onClick={handleClick}
            className="flex justify-center items-center gap-2 px-4 font-semibold rounded-md text-white dark:text-black bg-black dark:bg-white"
          >
            <Plus /> Ajouter un événement
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Chargement des événements...</p>
          ) : (
            events?.map((event: Event) => (
              <div
                key={event.id}
                className="up w-full p-6 border-gray-500 rounded-md border-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleEventClick(event)}
              >
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {event.description.length > 100
                    ? `${event.description.substring(0, 100)}...`
                    : event.description}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Section des logs */}
        <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold text-black dark:text-white mb-3">Logs des actions</h2>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {log}
                </p>
              ))
            ) : (
              <p className="text-gray-500">Aucune action enregistrée pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
