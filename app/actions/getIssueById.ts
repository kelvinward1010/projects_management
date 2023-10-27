import prisma from "@/app/libs/prismadb";

const getIssueById = async (
    issuesId: string
) => {
    try {
        const issue = await prisma.issues.findUnique({
            where: {
                id: issuesId
            },
        });

        return issue;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getIssueById;