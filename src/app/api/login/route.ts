import { prismaClient } from "@/database/client";
import { loginUserSchema } from "@/validations/validations";
import { NextRequest, NextResponse } from "next/server";
import { hash, compare, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const parsedBody = loginUserSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error);
  }

  const { email, password } = parsedBody.data;

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user || !compareSync(password, user.password)) {
    return NextResponse.json(
      {
        message: "Usuário ou senha incorretos",
      },
      {
        status: 400,
      }
    );
  }
  
  const secret = process.env.SECRET || ""

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({
    message: "Login realizado com sucesso",
    token: token,
    user: { name: user.name, email: user.email }
  })
  response.cookies.set({
    name: 'jwt',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  })


  return response
}
