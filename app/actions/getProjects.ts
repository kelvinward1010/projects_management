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
                tasks: {
                    include: {
                        creator: true,
                        seen: true,
                        issues: {
                            include: {
                                task: true
                            }
                        }
                    }
                }
            }
        });

        return projects;
    } catch (error: any) {
        console.log(error)
        return [];
    }
};

export default getProjects;