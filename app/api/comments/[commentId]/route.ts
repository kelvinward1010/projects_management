import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    commentId?: string;
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

        const updatedComment = await prisma.comment.update({
            where: {
                id: params?.commentId
            },
            data: {
                content: content,
                image: image,
            },
        });

        return NextResponse.json(updatedComment)
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
        const existingComment= await prisma.comment.findUnique({
            where: {
                id: params?.commentId
            },
        });

        if (!existingComment) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedComment = await prisma.comment.deleteMany({
            where: {
                id: params?.commentId
            },
        });

        return NextResponse.json(deletedComment)
    } catch (error) {
        return NextResponse.json(null);
    }
}