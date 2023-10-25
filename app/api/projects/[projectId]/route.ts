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
                        seen: true
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