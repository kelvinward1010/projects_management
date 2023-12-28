import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import _ from "lodash/fp";

interface IParams {
    projectId?: string;
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

        const existingProject = await prisma.projects.findUnique({
            where: {
                id: params?.projectId
            },
            include: {
                users: true,
                epics: {
                    include: {
                        creator: true,
                        seen: true,
                        storys: {
                            include: {
                                tasks: {
                                    include: {
                                        comments: true,
                                    }
                                },
                                comments: true
                            }
                        }
                    }
                },
                notiProject: true,
                scheduleConversation: true,
                addStatus: true,
            }
        });

        if (!existingProject) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        let updatedProject = [...(currentUser?.projectIds || [])]
        updatedProject = updatedProject.filter((id) => id !== params.projectId)

        let updatedParticipantProjectIds = [...(currentUser?.seenTaskIds || [])];

        existingProject?.epics?.forEach((epic) => {
            updatedParticipantProjectIds = updatedParticipantProjectIds.filter((id) => id !== epic.id)
        })

        existingProject.userIds.forEach(async(userId) => {
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    projectIds: updatedProject,
                    seenTaskIds: updatedParticipantProjectIds
                }
            });
        })
        existingProject?.epics?.forEach(async (epic) => {
            await prisma.epics.delete({
                where: {
                    id: epic?.id
                },
                include: {
                    project: true,
                    creator: true,
                    storys: {
                        include: {
                            tasks: {
                                include: {
                                    comments: true,
                                }
                            },
                            comments: true
                        }
                    }
                }
            })
        })

        const deletedProject = await prisma.projects.deleteMany({
            where: {
                id: params?.projectId,
            },
        });

        return NextResponse.json(deletedProject)
    } catch (error) {
        return NextResponse.json(null);
    }
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const project = await prisma.projects.findUnique({
            where: {
                id: params?.projectId
            },
            include: {
                users: true,
                epics: {
                    include: {
                        creator: true,
                        seen: true,
                        storys: {
                            include: {
                                tasks: true
                            }
                        },
                    }
                },
                notiProject: true,
                scheduleConversation: true,
                addStatus: true,
            }
        });
        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const body = await request.json();
        const {
            title,
            status,
            completionTime,
            userId,
            kickout,
            membersAdd,
            isAdd,
            isChangeLeader,
            leaderAdd,
        } = body;

        const updatedProject = await prisma.projects.update({
            where: {
                id: params?.projectId
            },
            data: {
                status: status,
                title: title,
                completionTime: completionTime,
            },
        });

        const existingProject = await prisma.projects.findUnique({
            where: {
                id: params?.projectId
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
                notiProject: true,
                scheduleConversation: true,
                addStatus: true,
            }
        });

        if (!existingProject) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        if(isChangeLeader) {
            let updatedLeaderId = [...(existingProject?.projectLeader)];
            updatedLeaderId?.push(leaderAdd)

            const updatedProject = await prisma.projects.update({
                where: {
                    id: params?.projectId
                },
                data: {
                    projectLeader: updatedLeaderId,
                },
                include: {
                    users: true
                }
            });

            await prisma.notification.create({
                data: {
                    title: `Project notification`,
                    descNoti: `${currentUser?.name} transfers the right to you as project leader: ${existingProject?.title}!`,
                    userId: leaderAdd,
                    whocreatedId: currentUser?.id,
                    projectId: existingProject?.id
                },
            });

            return NextResponse.json(updatedProject);
        }

        if(isAdd && existingProject?.users?.length >=1) {
            let updatedUserId = [...(existingProject?.userIds)];
            membersAdd?.forEach((it: any) => {
                updatedUserId?.push(it)
            })

            const updatedProject = await prisma.projects.update({
                where: {
                    id: params?.projectId
                },
                data: {
                    userIds: updatedUserId,
                },
                include: {
                    users: true
                }
            });

            membersAdd?.forEach(async(memberAdd: any) => {
                await prisma.notification.create({
                    data: {
                        title: `Project notification`,
                        descNoti: `${currentUser?.name} added you to a new project ${existingProject?.title}!`,
                        userId: memberAdd,
                        whocreatedId: currentUser?.id,
                        projectId: existingProject?.id
                    },
                });
            })

            return NextResponse.json(updatedProject);
        }
        

        if(kickout && existingProject?.users?.length >2) {
            let updatedUserId = [...(existingProject?.userIds || [])];
            updatedUserId = updatedUserId.filter((id) => id !== userId)

            let updatedUser = [...(existingProject?.users) || currentUser];
            updatedUser = updatedUser.filter((user) => user?.id !== userId)
            

            const updatedProject = await prisma.projects.update({
                where: {
                    id: params?.projectId
                },
                data: {
                    userIds: updatedUserId,
                },
                include: {
                    users: true
                }
            });

            await prisma.notification.create({
                data: {
                    title: `Project notification`,
                    descNoti: `${currentUser?.name} kicked you out of the project ${existingProject?.title}!`,
                    userId: userId,
                    whocreatedId: currentUser?.id,
                    projectId: existingProject?.id
                },
            });

            return NextResponse.json(updatedProject);
        }

        return NextResponse.json(updatedProject)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}