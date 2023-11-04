import { Badge } from "antd";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";


interface SidebarItemProps {
    label: string;
    icon: IconType;
    onClick?: () => void;
    active?: boolean;
    alert?: boolean;
    iconNoti: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    icon: Icon,
    onClick,
    active,
    iconNoti: IconNoti,
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <div className="flex flex-row items-center">
            <div className="
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
                {Icon ? (
                    <Icon size={24} style={{color: `${active ? "teal" : "black"}`}} />
                ):(
                    <Badge count={5}>
                        <IconNoti size={24} style={{color: `${active ? "teal" : "black"}`}} />
                    </Badge>
                )}
                <p style={{color: `${active ? "teal" : "black"}`}} className="hidden lg:block text-lg">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SidebarItem;