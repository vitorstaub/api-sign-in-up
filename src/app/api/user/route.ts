import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// api/user.ts

export async function GET(req: NextRequest, res: NextResponse) {

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
    const decodedToken = jwt.verify(value, secret);
    if (typeof decodedToken === 'string') {
        // Se o token for uma string, algo deu errado
        return NextResponse.json({ message: 'Token inválido' });
      }
    const { id, name, email } = decodedToken as JwtPayload;
    return NextResponse.json({ id, name, email });
  } catch (error) {
    return NextResponse.json({ message: 'Token inválido' });
  }
}
