import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

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


export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const existingProject = await prisma.tasks.findUnique({
            where: {
                id: params?.taskId
            },
        });

        if (!existingProject) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedProject = await prisma.tasks.deleteMany({
            where: {
                id: params?.taskId
            },
        });

        return NextResponse.json(deletedProject)
    } catch (error) {
        return NextResponse.json(null);
    }
}