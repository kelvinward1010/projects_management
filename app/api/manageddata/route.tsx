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


export async function DELETE(
    request: Request
) {
    try {

        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            isDeleteProject,
            ProjectId,
            isDeleteEpic,
            EpicId,
            isDeleteStory,
            StoryId,
            isDeleteTask,
            TaskId,
            isDeleteNotification,
            NotificationId,
            isDeleteComment,
            CommentId,
        } = body;

        if(!currentUser?.isAdmin === true){
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if(isDeleteNotification){
            const notifications = await prisma.notification.findUnique({
                where: {
                    id: NotificationId
                }
            });
            if (!notifications) {
                return new NextResponse('Invalid ID', { status: 400 });
            }
            const deletedNotification = await prisma.notification.deleteMany({
                where: {
                    id: NotificationId,
                },
            });
            return NextResponse.json(deletedNotification)
        }

        if(isDeleteProject){
            const projects = await prisma.projects.findUnique({
                where:{
                    id: ProjectId
                },
                include: {
                    users: true,
                    epics: {
                        include: {
                            storys: {
                                include: {
                                    tasks: true
                                }
                            }
                        }
                    },
                    scheduleConversation: true,
                    addStatus: true,
                }
            });
            if (!projects) {
                return new NextResponse('Invalid ID', { status: 400 });
            }

            const deletedProject = await prisma.projects.deleteMany({
                where: {
                    id: ProjectId,
                },
            });
            return NextResponse.json(deletedProject)
        }
        
        if(isDeleteEpic){
            const epics = await prisma.epics.findUnique({
                where: {
                    id: EpicId,
                },
                include: {
                    storys: true,
                }
            });
            if (!epics) {
                return new NextResponse('Invalid ID', { status: 400 });
            }

            const deletedEpic = await prisma.epics.deleteMany({
                where: {
                    id: EpicId,
                },
            });
            return NextResponse.json(deletedEpic)
        }

        if(isDeleteStory){
            const storys = await prisma.storys.findUnique({
                where:{
                    id: StoryId
                },
                include: {
                    tasks: true,
                    comments: true,
                }
            });
            if (!storys) {
                return new NextResponse('Invalid ID', { status: 400 });
            }
            const deletedStory = await prisma.storys.deleteMany({
                where: {
                    id: EpicId,
                },
            });
            return NextResponse.json(deletedStory)
        }

        if(isDeleteTask){
            const tasks = await prisma.tasks.findUnique({
                where: {
                    id: TaskId
                },
                include: {
                    comments: true
                }
            });
            if (!tasks) {
                return new NextResponse('Invalid ID', { status: 400 });
            }
            const deletedTask = await prisma.tasks.deleteMany({
                where: {
                    id: EpicId,
                },
            });
            return NextResponse.json(deletedTask)
        }

        if(isDeleteComment){
            const comments = await prisma.comment.findUnique({
                where: {
                    id: CommentId,
                }
            });
            if (!comments) {
                return new NextResponse('Invalid ID', { status: 400 });
            }
            const deletedComment = await prisma.comment.deleteMany({
                where: {
                    id: CommentId,
                },
            });
            return NextResponse.json(deletedComment)
        }

    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}