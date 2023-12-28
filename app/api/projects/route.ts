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
            isGroup,
            isAdminCreate,
            assignedTo,
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (!title) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if(isAdminCreate && members?.length >=2){
            const newProject = await prisma.projects.create({
                data: {
                    title,
                    isAdminCreate,
                    createdByWho: assignedTo,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                        ]
                    }
                },
                include: {
                    users: true,
                }
            });

            members?.forEach(async(member: any) => {
                await prisma.notification.create({
                    data: {
                        title: `Project notification`,
                        descNoti: `${currentUser?.name} has created a new project and added you to inside!`,
                        userId: member?.value,
                        whocreatedId: currentUser?.id,
                        projectId: newProject?.id
                    },
                });
            });

            return NextResponse.json(newProject);
        }
        
        if (isGroup && members?.length >=2) {
            const newProject = await prisma.projects.create({
                data: {
                    title,
                    isGroup,
                    createdByWho: currentUser?.id,
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

            let updatedLeaderId = [...(newProject?.projectLeader)];
            updatedLeaderId?.push(currentUser?.id)

            await prisma.projects.update({
                where: {
                    id: newProject?.id
                },
                data: {
                    projectLeader: updatedLeaderId,
                },
                include: {
                    users: true
                }
            });

            members?.forEach(async(member: any) => {
                await prisma.notification.create({
                    data: {
                        title: `Project notification`,
                        descNoti: `${currentUser?.name} has created a new project and added you to inside!`,
                        userId: member?.value,
                        whocreatedId: currentUser?.id,
                        projectId: newProject?.id
                    },
                });
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
                title,
                isGroup,
                createdByWho: currentUser?.id,
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

        try {
            if(newProject){
                await prisma.notification.create({
                    data: {
                        title: `Project notification`,
                        descNoti: `${currentUser?.name} added you to a new project!`,
                        userId: userId,
                        whocreatedId: currentUser?.id,
                        projectId: newProject?.id
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }

        return NextResponse.json(newProject)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}


export async function GET(
    request: Request
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const projects  = await prisma.projects.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                epics: {
                    include: {
                        creator: true,
                        seen: true,
                        storys: {
                            include: {
                                tasks: true,
                            }
                        }
                    }
                },
                notiProject: {
                    where: {
                        userId: currentUser?.id
                    }
                },
                scheduleConversation: true,
                addStatus: true,
            }
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}