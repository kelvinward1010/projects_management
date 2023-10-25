import { Typography } from 'antd';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';

const { Title } = Typography;

interface Props {
    title?: string;
    hadleDelete?: () => void;
}

function HeaderTop({
    title,
    hadleDelete
}: Props) {
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
            <Title level={2}>{title}</Title>  
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
                onClick={hadleDelete}
            >
                <AiOutlineDelete />
                Delete
            </button>
        </div>
    </>
  )
}

export default HeaderTop