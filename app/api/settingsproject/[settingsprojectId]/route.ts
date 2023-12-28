import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    settingsprojectId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const existingStatus = await prisma.addStatus.findUnique({
            where: {
                id: params?.settingsprojectId
            },
        });

        if (!existingStatus) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedeAddStatus = await prisma.addStatus.deleteMany({
            where: {
                id: params?.settingsprojectId
            },
        });

        return NextResponse.json(deletedeAddStatus)
    } catch (error) {
        return NextResponse.json(null);
    }
}