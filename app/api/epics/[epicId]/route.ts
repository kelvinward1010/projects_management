import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    epicId?: string;
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
            completionTime,
        } = body;

        const updatedEpic= await prisma.epics.update({
            where: {
                id: params?.epicId
            },
            data: {
                status: status,
                image: image,
                title: title,
                completionTime: completionTime,
            },
        });

        return NextResponse.json(updatedEpic)
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
        const existingEpic = await prisma.epics.findUnique({
            where: {
                id: params?.epicId
            },
        });

        if (!existingEpic) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedEpic = await prisma.epics.delete({
            where: {
                id: params?.epicId
            },
            include: {
                project: true,
                creator: true,
                storys: {
                    include: {
                        tasks: {
                            include: {
                                comments: true,
                            }
                        },
                        comments: true
                    }
                }
            }
        });

        return NextResponse.json(deletedEpic)
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

        const epic = await prisma.epics.findUnique({
            where: {
                id: params?.epicId
            },
            include: {
                storys: {
                    include: {
                        tasks: true,
                    }
                }
            }
        });

        return NextResponse.json(epic)
    } catch (error) {
        return NextResponse.json(null);
    }
}