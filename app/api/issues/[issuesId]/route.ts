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
            image,
            timework,
            assignto,
            desc,
            completionTime,
        } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const updatedIssue = await prisma.issues.update({
            where: {
                id: params?.issuesId
            },
            data: {
                status: status,
                title: title,
                desc: desc,
                timework: timework,
                assignto: assignto,
                image: image,
                completionTime: completionTime,
            },
        });

        const issue = await prisma.issues.findUnique({
            where: {
                id: params?.issuesId
            },
        });

        if (!issue) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        if(assignto !== issue?.assignto || assignto){
            await prisma.notification.create({
                data: {
                    title: `Issue notification`,
                    descNoti: `${currentUser?.name} assigned issue "${issue?.title}" to you!`,
                    userId: assignto,
                    whocreatedId: currentUser?.id,
                    issueId: issue?.id
                },
            });
        }

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

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const issue = await prisma.issues.findUnique({
            where: {
                id: params?.issuesId
            },
            include: {
                comments: {
                    include: {
                        issue: true
                    }
                }
            }
        });

        return NextResponse.json(issue)
    } catch (error) {
        return NextResponse.json(null);
    }
}