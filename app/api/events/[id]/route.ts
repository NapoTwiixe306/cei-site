// app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/src/utils/prisma/index';

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;

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

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Suppression de l'événement
    const deletedEvent = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(deletedEvent);
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Erreur lors de la suppression de l\'événement.' }, { status: 500 });
  }
}