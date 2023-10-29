import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    taskId?: string;
    
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
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
            taskId,
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const issues = await prisma.issues.create({
            data: {
                title: title,
                status: status,
                desc: desc,
                assignto: assignto,
                timework: timework,
                image: image,
                userId: currentUser.id,
                taskId: taskId,
            }
        });
        

        return NextResponse.json(issues)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}