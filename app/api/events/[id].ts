import { NextResponse } from 'next/server';
import prisma from "@/src/utils/prisma/index";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // On récupère l'ID des params de la route

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
