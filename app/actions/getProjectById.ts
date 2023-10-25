import prisma from "@/app/libs/prismadb";

const getProjectById = async (
    projectId: string
) => {
    try {
        const conversation = await prisma.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                users: true,
                tasks: true
            },
        });

        return conversation;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getProjectById;