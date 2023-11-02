import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    scheduleId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const body = await request.json();
        const {
            content,
            image,
        } = body;

        const updatedSschedule = await prisma.scheduleConversations.update({
            where: {
                id: params?.scheduleId
            },
            data: {
                content: content,
                image: image,
            },
        });

        return NextResponse.json(updatedSschedule)
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

        const existingscheduleConversations = await prisma.scheduleConversations.findUnique({
            where: {
                id: params?.scheduleId
            },
        });

        if (!existingscheduleConversations) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedeScheduleConversations = await prisma.scheduleConversations.deleteMany({
            where: {
                id: params?.scheduleId
            },
        });

        return NextResponse.json(deletedeScheduleConversations)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const getScheduleConversation = await prisma.scheduleConversations.findUnique({
            where: {
                id: params?.scheduleId
            },
            include: {
                project: {
                    include: {
                        scheduleConversation: true
                    }
                }
            }
        });

        return NextResponse.json(getScheduleConversation)
    } catch (error) {
        return NextResponse.json(null);
    }
}