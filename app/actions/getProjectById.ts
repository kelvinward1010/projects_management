import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getProjectById = async (
    projectId: string
) => {
    try {
        const currentUser = await getCurrentUser();
        
        const project = await prisma.projects.findUnique({
            where: {
                id: projectId
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
                notiProject: {
                    where: {
                        id: projectId,
                        userId: currentUser?.id
                    }
                },
                scheduleConversation: true,
                addStatus: true,
            }
        });

        return project;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getProjectById;