import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

const getTaskById = async (
    taskId?: string
) => {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        const issues = await prisma.tasks.findUnique({
            where: {
                id: taskId,
            },
            include: {
                issues: true,
            }
        });

        return issues;
    } catch (error: any) {
        return [];
    }
};

export default getTaskById;