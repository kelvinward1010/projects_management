import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    issuesId?: string;
    
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const body = await request.json();
        const {
            title,
            status,
            desc,
        } = body;

        const updatedIssue = await prisma.issues.update({
            where: {
                id: params?.issuesId
            },
            data: {
                status: status,
                title: title,
                desc: desc
            },
        });

        return NextResponse.json(updatedIssue)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const existingIssues = await prisma.issues.findUnique({
            where: {
                id: params?.issuesId
            },
        });

        if (!existingIssues) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedIssues = await prisma.issues.deleteMany({
            where: {
                id: params?.issuesId
            },
        });

        return NextResponse.json(deletedIssues)
    } catch (error) {
        return NextResponse.json(null);
    }
}