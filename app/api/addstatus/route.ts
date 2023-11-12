import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            label,
            value,
            isForEpics,
            isForStorys,
            isForInternals,
            projectId,
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const addStatus = await prisma.addStatus.create({
            data: {
                label: label,
                value: value,
                isForEpics: isForEpics ?? false,
                isForInternals: isForInternals ?? false,
                isForStorys: isForStorys ?? false,
                userId: currentUser?.id,
                projectId: projectId
            }
        });
        

        return NextResponse.json(addStatus)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}