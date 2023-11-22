import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    notiprojectId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const body = await request.json();
        const {
            isSeen,
            title,
            desc
        } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const updatednoticationProject = await prisma.notiProject.update({
            where: {
                id: params?.notiprojectId
            },
            data: {
                isSeen: isSeen,
                title: title,
                descNoti: desc,
            },
        });

        return NextResponse.json(updatednoticationProject)
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
        const existingNoti= await prisma.notiProject.findUnique({
            where: {
                id: params?.notiprojectId
            },
        });

        if (!existingNoti) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedNoti = await prisma.notiProject.deleteMany({
            where: {
                id: params?.notiprojectId
            },
        });

        return NextResponse.json(deletedNoti)
    } catch (error) {
        return NextResponse.json(null);
    }
}