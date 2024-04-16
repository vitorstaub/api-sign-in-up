import jwt, { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies()

    const token = cookieStore.get('jwt')

    if(!token) {
        return NextResponse.json(
            {
              message: "Usuário não autenticado",
            },
            {
              status: 401,
            }
          )
    }
    const { value } = token

    const secret = process.env.SECRET || ""

    try {
        verify(value, secret)
        return NextResponse.json(
            {
              message: "Acesso garantido",
            },
            {
              status: 200,
            }
          )
    } catch (error) {
        return NextResponse.json(
            {
              message: "Something went wrong",
            },
            {
              status: 400,
            }
          )
    }
}