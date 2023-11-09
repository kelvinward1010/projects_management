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
        const body = await request.json();
        const {
            title,
            status,
            image,
            timework,
            assignto,
            desc,
            completionTime,
            isAssign,
            type,
        } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const updatedtask = await prisma.tasks.update({
            where: {
                id: params?.taskId
            },
            data: {
                status: status,
                title: title,
                desc: desc,
                timework: timework,
                assignto: assignto,
                image: image,
                completionTime: completionTime,
                type: type,
            },
        });

        const task = await prisma.tasks.findUnique({
            where: {
                id: params?.taskId
            },
        });

        if (!task) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        if(assignto !== task?.assignto && isAssign === true || assignto && isAssign === true){
            await prisma.notification.create({
                data: {
                    title: `Task notification`,
                    descNoti: `${currentUser?.name} assigned story "${task?.title}" to you!`,
                    userId: assignto,
                    whocreatedId: currentUser?.id,
                    taskId: task?.id
                },
            });
        }

        return NextResponse.json(updatedtask)
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

        const existingTask = await prisma.tasks.findUnique({
            where: {
                id: params?.taskId
            },
        });

        if (!existingTask) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedTask = await prisma.tasks.deleteMany({
            where: {
                id: params?.taskId
            },
        });

        return NextResponse.json(deletedTask)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: params?.taskId
            },
            include: {
                comments: true
            }
        });

        return NextResponse.json(task)
    } catch (error) {
        return NextResponse.json(null);
    }
}