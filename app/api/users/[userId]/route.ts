import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
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

        const user = await prisma.user.findUnique({
            where: {
                id: params.userId
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.isAdmin === true) {
            return NextResponse.json(null);
        }

        const user = await prisma.user.delete({
            where: {
                id: params.userId
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.isAdmin === true) {
            return NextResponse.json(null);
        }

        const body = await request.json();
        const {
            name,
            name_Id,
            image,
            email,
        } = body;

        const user = await prisma.user.update({
            where: {
                id: params.userId
            },
            data: {
                name: name,
                email: email,
                image: image,
                name_Id: name_Id,
            },
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}