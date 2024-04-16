import { getUser } from "@/app/page";
import { prismaClient } from "@/database/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest, res: NextResponse){
    try {
        const body = await req.json()

        const { name } = body

        if (!name) {
            return new NextResponse('Name is required', {status: 400})
        }

        const { data } = await axios.get("/api/user");

        const store = prismaClient.store.create({
            data: {
                name,
                userId: data.id,
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log('STORES_POST', error);
        return new NextResponse('Interal error', { status: 500});
    }

}