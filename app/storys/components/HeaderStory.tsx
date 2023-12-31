"use client"
import { Typography } from "antd";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteStoryModal from "./modals/DeleteStoryModal";
import useProject from "@/app/hooks/useProject";
import useUser from "@/app/hooks/useUser";


const { Title } = Typography;

interface Props {
    story?: any;
    currentUser?: any;
}

function HeaderStory({
    story,
    currentUser
}:Props) {
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const {data: dataProject} = useProject(story?.projectId);
    const leader = dataProject?.projectLeader[dataProject?.projectLeader?.length -1]
    const userLeader = useUser(leader)?.data;

    const checkuser = () => {
        return story?.assignto == currentUser?.id || userLeader?.id == currentUser?.id ? false : true
    }

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
                {checkuser() === false ? <button
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
                </button>: null}
            </div>
        </>
    )
}

export default HeaderStory