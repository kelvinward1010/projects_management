import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    commentId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

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