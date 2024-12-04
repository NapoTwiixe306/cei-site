import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Utiliser getToken si tu utilises JWT
import  prisma  from '@/src/utils/prisma/index'; // Assurez-vous que tu as Prisma bien configuré

export async function POST(req: NextRequest) {
  try {
    // Récupérer le token JWT depuis les cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Si le token n'est pas présent (utilisateur non authentifié)
    if (!token) {
      return NextResponse.json({ message: 'Utilisateur non autorisé' }, { status: 401 });
    }

    // Extraire les données de la requête
    const { title, description, date, imageUrl } = await req.json();

    // Vérifier les informations de la requête
    if (!title || !description || !date) {
      return NextResponse.json({ message: 'Des informations sont manquantes dans la requête.' }, { status: 400 });
    }

    // Créer un événement dans la base de données avec Prisma
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date,
        imageUrl,
        createdBy: { connect: { email: token.email as string } }, // Utiliser l'email du token
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la création de l\'événement', error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
