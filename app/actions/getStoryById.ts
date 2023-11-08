import prisma from "@/app/libs/prismadb";

const getStoryById = async (
    storyId: string
) => {
    try {
        const story = await prisma.storys.findUnique({
            where: {
                id: storyId
            },
            include: {
                tasks: true,
                issues: true,
                comments: true,
            }
        });

        return story;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getStoryById;