import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            name,
            image,
            password,
            newpassword,
            isChangePassword,
        } = body;

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name
            },
        });

        if(isChangePassword === true) {
            const passCurrentUser = String(currentUser?.hashedPassword)
            const isCorrectPassword = bcrypt.compare(
                password,
                passCurrentUser
            );

            if (!isCorrectPassword) {
                return new Error('Password invalid!');
            }

            const hashedPassword = await bcrypt.hash(newpassword, 12);

            const updatedUser = await prisma.user.update({
                where: {
                    id: currentUser.id
                },
                data: {
                    hashedPassword: hashedPassword
                },
            });

            return NextResponse.json(updatedUser)
        }
        

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}