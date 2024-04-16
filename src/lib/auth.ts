import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/database/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient as any),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        console.log("Authorize method", credentials);

        if (!credentials?.email || !credentials?.password)
          throw new Error("Dados de login necessarios");

        const user = await prismaClient.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};
