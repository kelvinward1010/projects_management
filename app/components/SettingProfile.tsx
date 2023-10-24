"use client"
import { User } from "@prisma/client"
import Avatar from "./Avatar";
import SettingsModal from "./modals/SettingModal";
import { useState } from "react";


interface Props {
    currentUser: User;
}

function SettingProfile({ currentUser }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    return (
        <>
            <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div
                className="cursor-pointer hover:opacity-75 transition"
            >
                <Avatar 
                    onClick={open}
                    user={currentUser} 
                    image={currentUser?.profileImage || currentUser?.image} 
                />
            </div>
        </>
    )
}

export default SettingProfile