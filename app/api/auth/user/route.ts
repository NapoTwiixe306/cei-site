import { NextResponse } from "next/server";
import prisma from "../../../../src/utils/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Vérifier si l'email existe déjà
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Hacher le mot de passe et créer l'utilisateur avec le rôle "user"
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Rôle par défaut
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}