"use client"

import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";

interface Props {
    user?: User;
};

const Sidebar: React.FC<Props> = ({ user }) => {

    const routes = useRoutes();

    return (
        <div className="h-full pl-3 border-2 border-r-teal-600">
            <div className="flex flex-col items-start">
                <div className="lg:w-[230px]">
                    <div>
                        {routes.map((item) => (
                            <SidebarItem 
                                key={item?.href}
                                icon={item?.icon}
                                label={item?.label}
                                onClick={item.onClick}
                                active={item.active}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;