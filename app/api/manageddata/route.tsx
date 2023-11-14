import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function GET(
    request: Request
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser?.isAdmin === true){
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const projects = await prisma.projects.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                users: true,
                epics: {
                    include: {
                        storys: true
                    }
                },
                scheduleConversation: true,
                addStatus: true,
            }
        });
        
        const epics = await prisma.epics.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                storys: true,
            }
        });

        const storys = await prisma.storys.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tasks: true,
                comments: true,
            }
        });

        const tasks = await prisma.tasks.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                comments: true
            }
        });

        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            projects,
            notifications,
            epics,
            storys,
            tasks,
            comments
        });
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}