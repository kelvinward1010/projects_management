import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    id?: string;
    
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            content,
            image,
            storyId,
            taskId
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const commentIn = await prisma.comment.create({
            data: {
                content: content,
                image: image,
                userId: currentUser.id,
                storyId: storyId,
                taskId: taskId,
            }
        });
        

        return NextResponse.json(commentIn)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}