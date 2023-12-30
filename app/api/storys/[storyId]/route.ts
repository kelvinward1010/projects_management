import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    storyId?: string;
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
            isAssign,
        } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const updatedstory = await prisma.storys.update({
            where: {
                id: params?.storyId
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

        const story = await prisma.storys.findUnique({
            where: {
                id: params?.storyId
            },
        });

        if (!story) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        if(assignto !== story?.assignto && isAssign === true || assignto && isAssign === true){
            await prisma.notiProject.create({
                data: {
                    title: `Story notification`,
                    descNoti: `${currentUser?.name} assigned story "${story?.title}" to you!`,
                    userId: assignto,
                    whocreatedId: currentUser?.id,
                    storyId: story?.id,
                    projectId: story?.projectId
                },
            });
        }

        return NextResponse.json(updatedstory)
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
        const existingStory = await prisma.storys.findUnique({
            where: {
                id: params?.storyId
            },
        });

        if (!existingStory) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedStory = await prisma.storys.delete({
            where: {
                id: params?.storyId
            },
            include: {
                tasks: {
                    include: {
                        comments: true,
                    }
                },
                comments: true
            }
        });

        return NextResponse.json(deletedStory)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const story = await prisma.storys.findUnique({
            where: {
                id: params?.storyId
            },
            include: {
                tasks: true,
                comments: {
                    include: {
                        reply: true
                    }
                },
            }
        });

        return NextResponse.json(story)
    } catch (error) {
        return NextResponse.json(null);
    }
}