import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/src/utils/prisma/index";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Récupère l'ID de l'URL
  
  console.log("Requested ID:", id); // LOG: ID demandé

  if (!id) {
    console.error("ID manquant dans l'URL."); // LOG: ID manquant
    return NextResponse.json({ message: 'ID manquant dans l\'URL.' }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: {
        createdBy: {
          select: { name: true },
        },
      },
    });

    console.log("Fetched Event:", event); // LOG: Détails de l'événement

    if (!event) {
      console.error("Événement non trouvé."); // LOG: Événement non trouvé
      return NextResponse.json({ message: 'Événement non trouvé.' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error); // LOG: Erreur serveur
    return NextResponse.json({ message: 'Une erreur est survenue.' }, { status: 500 });
  }
}
