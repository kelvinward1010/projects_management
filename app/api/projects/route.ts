import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function POST(
    request: Request,
){
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            members,
            title,
            isGroup
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (!members || members.length === 1 || !title) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        
        if (isGroup) {
            const newProject = await prisma.projects.create({
                data: {
                    title,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                }
            });

            return NextResponse.json(newProject);
        }

        const existingProjects = await prisma.projects.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleProject = existingProjects[0];

        if (singleProject) {
            return NextResponse.json(singleProject);
        }

        const newProject = await prisma.projects.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(newProject)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}