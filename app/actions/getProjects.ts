import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getProjects = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const projects  = await prisma.projects.findMany({
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                tasks: true
            }
        });

        return projects;
    } catch (error: any) {
        return [];
    }
};

export default getProjects;