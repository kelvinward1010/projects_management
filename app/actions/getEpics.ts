import prisma from "@/app/libs/prismadb";

const getEpics = async (
    projectId: string
) => {
    try {
        const epics = await prisma.epics.findMany({
            where: {
                projectId: projectId
            },
            include: {
                creator: true,
                seen: true,
                storys: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return epics;
    } catch (error: any) {
        return [];
    }
};

export default getEpics;