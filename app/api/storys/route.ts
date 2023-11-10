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
            epicId,
            projectId,
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const story = await prisma.storys.create({
            data: {
                title: title,
                status: status,
                desc: desc,
                assignto: assignto,
                timework: timework,
                image: image,
                userId: currentUser.id,
                epicId: epicId,
                projectId: projectId,
            }
        });
        

        return NextResponse.json(story)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}