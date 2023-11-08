import prisma from "@/app/libs/prismadb";

const getEpicById = async (
    taskId?: string
) => {
    try {

        const epic = await prisma.epics.findUnique({
            where: {
                id: taskId,
            },
            include: {
                storys: true,
            }
        });

        return epic;
    } catch (error: any) {
        return [];
    }
};

export default getEpicById;