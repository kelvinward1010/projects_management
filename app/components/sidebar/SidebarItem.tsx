"use client"
import { takeDataNotiNotSeen } from "@/app/equation";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useNotifications from "@/app/hooks/useNotifications";
import { Badge } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";


interface SidebarItemProps {
    label: string;
    icon: IconType;
    onClick?: () => void;
    active?: boolean;
    alert?: boolean;
    iconNoti: IconType;
    iconAdmin: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    icon: Icon,
    onClick,
    active,
    iconNoti: IconNoti,
    iconAdmin: IconAdmin
}) => {

    const router = useRouter();
    const [isSee, setIsSee] = useState(false);
    const currentUser = useCurrentUser()?.data;
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };
    const data = useNotifications()?.data

    const notifications = takeDataNotiNotSeen(data);

    const handleNotiSeen = () => {
        notifications?.forEach((notification) =>{
            axios.post(`/api/notifications/${notification?.id}`, {
                isSeen: true,
            })
                .then(() => {
                    router.refresh();
                    router.push('/notifications')
                    setIsSee(true);
                })
        })
    }

    return (
        <div className="flex flex-row items-center">
            {Icon && <div className="
                    relative
                    hidden 
                    lg:flex 
                    items-row 
                    gap-4 
                    p-4 
                    rounded-full 
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer
                    items-center
                "
                onClick={handleClick}
                key={label}
            >
                    <Icon size={24} style={{color: `${active ? "teal" : "black"}`}} />
                <p style={{color: `${active ? "teal" : "black"}`}} className="hidden lg:block text-lg">
                    {label}
                </p>
            </div>}
            {IconNoti && <div className="
                    relative
                    hidden 
                    lg:flex 
                    items-row 
                    gap-4 
                    p-4 
                    rounded-full 
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer
                    items-center
                "
                onClick={handleClick}
                key={label}
            >
                <Badge count={isSee === true ? 0 : notifications?.length}>
                    <IconNoti onClick={handleNotiSeen} size={24} style={{color: `${active ? "teal" : "black"}`}} />
                </Badge>
                <p onClick={handleNotiSeen} style={{color: `${active ? "teal" : "black"}`}} className="hidden lg:block text-lg">
                    {label}
                </p>
            </div>}
            {IconAdmin && currentUser?.isAdmin !== null && <div className="
                    relative
                    hidden 
                    lg:flex 
                    items-row 
                    gap-4 
                    p-4 
                    rounded-full 
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer
                    items-center
                "
                onClick={handleClick}
                key={label}
            >
                    <IconAdmin size={24} style={{color: `${active ? "teal" : "black"}`}} />
                <p style={{color: `${active ? "teal" : "black"}`}} className="hidden lg:block text-lg">
                    {label}
                </p>
            </div>}
        </div>
    )
}

export default SidebarItem;