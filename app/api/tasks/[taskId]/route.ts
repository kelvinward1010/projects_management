import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    taskId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const body = await request.json();
        const {
            title,
            status,
        } = body;

        const updatedTask = await prisma.tasks.update({
            where: {
                id: params?.taskId
            },
            data: {
                status: status,
                title: title
            },
        });

        return NextResponse.json(updatedTask)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}