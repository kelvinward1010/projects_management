import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    addstatusId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const existingStatus = await prisma.addStatus.findUnique({
            where: {
                id: params?.addstatusId
            },
        });

        if (!existingStatus) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedeAddStatus = await prisma.addStatus.deleteMany({
            where: {
                id: params?.addstatusId
            },
        });

        return NextResponse.json(deletedeAddStatus)
    } catch (error) {
        return NextResponse.json(null);
    }
}