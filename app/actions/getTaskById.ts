import prisma from "@/app/libs/prismadb";

const getTaskById = async (
    taskId: string
) => {
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: taskId
            },
            include: {
                comments: true,
            }
        });

        return task;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getTaskById;