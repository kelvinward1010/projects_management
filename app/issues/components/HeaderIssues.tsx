"use client"
import { Typography } from "antd";
import { AiOutlineDelete } from "react-icons/ai";


const { Title } = Typography;

interface Props {
    issue?: any;
}

function HeaderIssues({
    issue
}:Props) {
    return (
        <>
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
            >
                <AiOutlineDelete />
                Delete
            </button>
        </div>
    </>
    )
}

export default HeaderIssues