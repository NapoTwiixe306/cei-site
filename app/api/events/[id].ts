import { NextResponse } from 'next/server';
import prisma from "@/src/utils/prisma/index";

// La fonction de traitement de la route GET
export async function GET(req: Request) {
  const url = new URL(req.url);  // Crée un objet URL à partir de la requête
  const id = url.pathname.split('/').pop();  // Récupère le paramètre `id` à partir de l'URL
  
  if (!id) {
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

    if (!event) {
      return NextResponse.json({ message: 'Événement non trouvé.' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ message: 'Une erreur est survenue.' }, { status: 500 });
  }
}
