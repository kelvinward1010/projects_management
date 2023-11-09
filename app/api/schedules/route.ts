import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    projectId?: string;
    
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
            projectId,
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const scheduleConversation = await prisma.scheduleConversations.create({
            data: {
                content: content,
                image: image,
                userId: currentUser.id,
                projectId:  projectId
            }
        });

        const existingProject = await prisma.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                users: true,
                epics: {
                    include: {
                        creator: true,
                        seen: true,
                        storys: true
                    }
                },
                scheduleConversation: true,
            }
        });

        if (!existingProject) {
            return new NextResponse('Invalid ID', { status: 400 });
        }



        if(scheduleConversation){
            existingProject?.userIds.forEach(async(userId) => {
                await prisma.notification.create({
                    data: {
                        title: `Schedule conversations notification`,
                        descNoti: `${currentUser?.name} has created a new schedule conversations in project: ${existingProject?.title}!`,
                        userId: userId,
                        whocreatedId: currentUser?.id,
                        projectId: existingProject?.id
                    },
                });
            })
        }
        

        return NextResponse.json(scheduleConversation)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}