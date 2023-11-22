"use client"

import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";
import { User } from "@prisma/client";

interface Props {
    user?: User;
};

const Sidebar: React.FC<Props> = ({ user }) => {

    const routes = useRoutes();

    return (
        <div className="min-h-screen pl-3 border border-r-teal-600">
            <div className="flex flex-col items-start">
                <div className="lg:w-[230px]">
                    <div>
                        {routes.map((item) => (
                            <SidebarItem 
                                key={item?.label}
                                icon={item?.icon}
                                label={item?.label}
                                onClick={item.onClick}
                                active={item.active}
                                iconAdmin={item?.isAdmin}
                                iconLogout={item?.iconLogout}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;