"use client"
import { User } from "@prisma/client"
import SettingsModal from "./modals/SettingModal";
import { useState } from "react";
import { NotificationFilled, SettingOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Drawer, Dropdown, Modal, Typography } from "antd";
import ChangePassword from "./ChangePassword";
import useNotifications from "../hooks/useNotifications";


interface Props {
    currentUser: User;
}

const { Text } = Typography;

function SettingProfile({ currentUser }: Props) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
    const [openNoti,setOpenNoti] = useState(false)
    const notifications = useNotifications()?.data ?? [];

    const showDrawer = () => {
        setOpenNoti(true);
    };

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
                    onClose={setIsOpenChangePassword} 
                    currentUser={currentUser}
                />
            </Modal>
            <div className="flex flex-center items-center">
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
                    onClick={() => showDrawer()}
                >
                    <NotificationFilled />
                    Notification
                </button>
                <Drawer title="Notification" placement="right" onClose={() => setOpenNoti(false)} open={openNoti}>
                    <div className='w-full h-full overflow-y-auto'>
                        {notifications?.slice(0,8)?.reverse()?.map((item: any) => (
                            <div key={item?.id} className='w-full h-fit p-2 border border-teal-600 rounded mt-2'>
                                <Text className='w-full'>{item?.descNoti}</Text>
                            </div>
                        ))}
                    </div>
                </Drawer>
                <div
                    className="cursor-pointer hover:opacity-75 transition ml-2"
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