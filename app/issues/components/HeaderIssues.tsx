"use client"
import { Typography } from "antd";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteIssueModal from "./modals/DeleteIssueModal";


const { Title } = Typography;

interface Props {
    issue?: any;
}

function HeaderIssues({
    issue
}:Props) {
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    return (
        <>
            <DeleteIssueModal
                issueId={issue?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
                issue={issue}
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
                <Title level={2}>{issue?.title}</Title>  
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

export default HeaderIssues