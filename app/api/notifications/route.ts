import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function GET(
    request: Request
) {
    try {

        const currentUser = await getCurrentUser();
        if (!currentUser?.id) {
            return [];
        }


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: currentUser?.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                hasNotification: false,
            }
        });
        

        return NextResponse.json(notifications);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}