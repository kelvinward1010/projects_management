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
                        participant: true
                    }
                }
            }
        });

        console.log(projects)

        return projects;
    } catch (error: any) {
        console.log(error)
        return [];
    }
};

export default getProjects;