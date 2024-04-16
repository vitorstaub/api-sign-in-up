import { prismaClient } from "@/database/client";
import { registerUserSchema } from "@/validations/validations";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {

  const body = await req.json();
  const parsedBody = registerUserSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error);
  }

  const { name, email, password } = parsedBody.data;

  const userFound = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });
  if (userFound) {
    return NextResponse.json(
      {
        message: "Usuario já existe",
      },
      {
        status: 400,
      }
    );
  }

  const HashPassword = hashSync(password, 8)

  const user = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: HashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json({
    message: "Usuário criado com sucesso", user: user
  })
}