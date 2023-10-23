import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";


interface SidebarItemProps {
    label: string;
    icon: IconType;
    onClick?: () => void;
    active?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    icon: Icon,
    onClick,
    active,
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
                <Icon size={24} color="black" />
                <p className="hidden lg:block text-black text-xl">
                    {label}
                </p>
                {active ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
            </div>
        </div>
    )
}

export default SidebarItem;