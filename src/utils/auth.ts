import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt"; // Importer le type JWT de next-auth

// Définir le type personnalisé pour le JWT avec un champ 'role'
interface CustomJWT extends JWT {
  role?: string; // Rôle est optionnel, mais il sera présent dans notre cas
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role, // Inclure le rôle
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si l'utilisateur est défini (lors de la connexion)
      if (user) {
        // Ajouter le rôle au token personnalisé
        (token as CustomJWT).role = user.role || 'user'; // Assigner 'user' par défaut si role est undefined
      }
      return token;
    },
    async session({ session, token }) {
      // Ajouter le rôle à la session à partir du token
      if (token && (token as CustomJWT).role) {
        session.user.role = (token as CustomJWT).role || 'user'; // Assigner 'user' par défaut si role est undefined
      }
      return session;
    },
  },
};
