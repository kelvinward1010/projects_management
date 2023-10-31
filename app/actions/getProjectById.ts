import prisma from "@/app/libs/prismadb";

const getProjectById = async (
    projectId: string
) => {
    try {
        const project = await prisma.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                users: true,
                tasks: {
                    include: {
                        issues: true
                    }
                },
            },
        });

        return project;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getProjectById;