import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            title,
            status,
            image,
            projectId
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newEpic = await prisma.epics.create({
            include: {
                creator: true,
            },
            data: {
                title: title,
                status: status,
                image: image,
                project: {
                    connect: { id: projectId }
                },
                creator: {
                    connect: { id: currentUser.id }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                },
            }
        });

        return NextResponse.json(newEpic)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}