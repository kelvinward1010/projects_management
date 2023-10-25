"use client"
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
    user: User;
    isLarge?: boolean;
    hasBorders?: boolean;
    image?: string | null;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
    user,
    isLarge,
    hasBorders,
    image,
    onClick
}) => {

    const router = useRouter();
    
    return (
        <div
            className={`
                ${hasBorders ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full 
                hover:opacity-90 
                transition 
                cursor-pointer
                relative
            `}
            onClick={onClick}
        >
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                src={image || '/images/placeholder.jpg'}
            />
        </div>
    )
}

export default Avatar;
