import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

const getProjectById = async (
    projectId: string
) => {
    try {
        const currentUser = await getCurrentUser();


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const project = await prisma.projects.findUnique({
            where: {
                id: projectId
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
                notiProject: {
                    where: {
                        id: projectId,
                        userId: currentUser?.id
                    }
                },
                scheduleConversation: true,
                addStatus: true,
            },
        });

        return project;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getProjectById;