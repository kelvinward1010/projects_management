import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

const getIssueById = async (
    issuesId: string
) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }
        const issue = await prisma.issues.findUnique({
            where: {
                id: issuesId
            },
            include: {
                comments: {
                    include: {
                        issue: true
                    }
                }
            }
        });

        return issue;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getIssueById;