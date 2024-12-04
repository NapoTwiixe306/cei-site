// pages/api/events/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/src/utils/prisma/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
        include: {
          createdBy: {
            select: { name: true },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ message: 'Événement non trouvé.' });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Une erreur est survenue.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
