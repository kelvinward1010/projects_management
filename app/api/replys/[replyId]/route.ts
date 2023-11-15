import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    replyId?: string;
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

        const updatedreply = await prisma.reply.update({
            where: {
                id: params?.replyId
            },
            data: {
                content: content,
                image: image,
            },
        });

        return NextResponse.json(updatedreply)
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
        const existingReply= await prisma.reply.findUnique({
            where: {
                id: params?.replyId
            },
        });

        if (!existingReply) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedReply = await prisma.reply.delete({
            where: {
                id: params?.replyId
            },
        });

        return NextResponse.json(deletedReply)
    } catch (error) {
        return NextResponse.json(null);
    }
}