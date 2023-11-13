"use client"
import { User } from "@prisma/client"
import Avatar from "./Avatar";
import SettingsModal from "./modals/SettingModal";
import { useState } from "react";
import { SettingOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import ChangePassword from "./ChangePassword";


interface Props {
    currentUser: User;
}

function SettingProfile({ currentUser }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

    const items = [
        {
          label: <>
            <button
                className="
                    w-48
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                "
                onClick={()=>setIsOpenProfile(true)}
            >
                <UserSwitchOutlined />
                Profile
            </button>
          </>,
          key: '0',
        },
        {
          label: <>
            <button
                className="
                    w-48
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                "
                onClick={()=>setIsOpenChangePassword(true)}
            >
                Change Password
            </button>
          </>,
          key: '1',
        },
    ]
    return (
        <>
            <SettingsModal 
                currentUser={currentUser} 
                isOpen={isOpenProfile} 
                onClose={() => setIsOpenProfile(false)} 
            />
            <Modal
                title="Change Password"
                open={isOpenChangePassword} 
                onCancel={() => setIsOpenChangePassword(false)}
                className="modal-edit"
                width={700}
            >
                <ChangePassword 
                    onClose={() => setIsOpenChangePassword(false)} 
                    currentUser={currentUser}
                />
            </Modal>
            <div className="flex flex-center items-center">
                <Avatar 
                    user={currentUser} 
                    image={currentUser?.profileImage || currentUser?.image} 
                />
                <div
                    className="cursor-pointer hover:opacity-75 transition ml-5"
                >
                    <Dropdown
                        menu={{
                        items,
                        }}
                        trigger={['click']}
                    >
                        <button
                            className="
                                w-fit
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-md
                                shadow-lg
                                px-2
                            "
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <SettingOutlined />
                            Settings
                        </button>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default SettingProfile