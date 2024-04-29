import { getUserInfo } from "@/app/dashboard/layout";
import { prismaClient } from "@/database/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest, res: NextResponse){
    try {
        const body = await req.json()

        const { data } = await axios.get("/api/user");
        const user = await getUserInfo();
        const { name } = body

        if (!data.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        if (!name) {
            return new NextResponse('Name is required', {status: 400})
        }

        const store = prismaClient.store.create({
            data: {
                name,
                userId: data.id
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log(['STORES_POST'], error);
        return new NextResponse('Internal error', { status: 500 });
    }

}