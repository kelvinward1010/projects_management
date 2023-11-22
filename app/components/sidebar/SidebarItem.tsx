"use client"
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { IconType } from "react-icons";


interface SidebarItemProps {
    label: string;
    icon: IconType;
    onClick?: () => void;
    active?: boolean;
    alert?: boolean;
    iconAdmin: IconType;
    iconLogout: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    icon: Icon,
    onClick,
    active,
    iconAdmin: IconAdmin,
    iconLogout: IconLogout,
}) => {

    const currentUser = useCurrentUser()?.data;
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };


    return (
        <div className="flex flex-row items-center">
            {Icon && currentUser?.isAdmin === null && <div className="
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
            {IconLogout  && <div className="
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
                    <IconLogout size={24} style={{color: `${active ? "teal" : "black"}`}} />
                <p style={{color: `${active ? "teal" : "black"}`}} className="hidden lg:block text-lg">
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