import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    notificationId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const body = await request.json();
        const {
            isSeen,
        } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const updatednotication = await prisma.notification.update({
            where: {
                id: params?.notificationId
            },
            data: {
                isSeen: isSeen,
            },
        });

        return NextResponse.json(updatednotication)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const existingNoti= await prisma.notification.findUnique({
            where: {
                id: params?.notificationId
            },
        });

        if (!existingNoti) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedNoti = await prisma.notification.deleteMany({
            where: {
                id: params?.notificationId
            },
        });

        return NextResponse.json(deletedNoti)
    } catch (error) {
        return NextResponse.json(null);
    }
}