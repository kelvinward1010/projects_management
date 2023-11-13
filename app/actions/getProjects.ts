import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getProjects = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
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
                scheduleConversation: true,
                addStatus: true,
            }
        });
        return projects;
    } catch (error: any) {
        console.log(error)
        return [];
    }
};

export default getProjects;