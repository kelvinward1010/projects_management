import prisma from "@/app/libs/prismadb";

const getTasks = async (
    projectId: string
) => {
    try {
        const tasks = await prisma.tasks.findMany({
            where: {
                projectId: projectId
            },
            include: {
                creator: true,
                participant: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return tasks;
    } catch (error: any) {
        return [];
    }
};

export default getTasks;