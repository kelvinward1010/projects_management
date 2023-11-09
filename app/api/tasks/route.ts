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
            desc,
            timework,
            image,
            assignto,
            type,
            storyId,
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const task = await prisma.tasks.create({
            data: {
                title: title,
                status: status,
                desc: desc,
                assignto: assignto,
                timework: timework,
                image: image,
                type: type,
                userId: currentUser.id,
                storyId: storyId,
            }
        });
        

        return NextResponse.json(task)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}