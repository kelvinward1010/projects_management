"use client"
import { Typography } from "antd";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteStoryModal from "./modals/DeleteStoryModal";


const { Title } = Typography;

interface Props {
    story?: any;
}

function HeaderStory({
    story
}:Props) {
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    return (
        <>
            <DeleteStoryModal
                storyId={story?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
                story={story}
            />
            <div
                className='
                    h-16
                    w-full
                    flex
                    justify-between
                    p-5
                    items-center
                '
            >
                <Title level={2}>{story?.title}</Title>  
                <button
                    className="
                        w-52
                        h-9
                        bg-red-500
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        shadow-lg
                    "
                    onClick={() => setIsModalOpenDelete(true)}
                >
                    <AiOutlineDelete />
                    Delete
                </button>
            </div>
        </>
    )
}

export default HeaderStory