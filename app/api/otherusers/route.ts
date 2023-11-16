import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
) {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(null);
    }
}