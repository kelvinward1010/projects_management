import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

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
                tasks: {
                    include: {
                        creator: true,
                        seen: true,
                        issues: true
                    }
                }
            }
        });

        if (!existingProject) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        let updatedProject = [...(currentUser?.projectIds || [])]
        updatedProject = updatedProject.filter((id) => id !== params.projectId)

        let updatedParticipantProjectIds = [...(currentUser?.seenTaskIds || [])];

        existingProject?.tasks?.forEach((task) => {
            updatedParticipantProjectIds = updatedParticipantProjectIds.filter((id) => id !== task.id)
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
        existingProject?.tasks?.forEach(async (task) => {
            await prisma.tasks.delete({
                where: {
                    id: task?.id
                },
                include: {
                    project: true
                }
            })
        })

        const deletedProject = await prisma.projects.deleteMany({
            where: {
                id: params?.projectId,
                userIds: {
                    hasSome: [currentUser.id]
                },
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
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const project = await prisma.projects.findUnique({
            where: {
                id: params?.projectId
            },
            include: {
                users: true,
                tasks: {
                    include: {
                        creator: true,
                        seen: true,
                        issues: {
                            include: {
                                comments: true
                            }
                        }
                    }
                },
                scheduleConversation: true
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
        const body = await request.json();
        const {
            title,
            status,
            completionTime,
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

        return NextResponse.json(updatedProject)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}