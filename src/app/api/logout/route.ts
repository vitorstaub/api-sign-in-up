import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

  const response = NextResponse.json({
    message: "Logout realizado com sucesso",
  })

  response.cookies.set({
    name: 'jwt',
    value: '',
    httpOnly: true,
    maxAge: 0,
  })
  
  return response;
}