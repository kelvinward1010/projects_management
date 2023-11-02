import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

export async function GET(
    request: Request,
) {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return NextResponse.json(currentUser)
    } catch (error) {
        return NextResponse.json(null);
    }
}