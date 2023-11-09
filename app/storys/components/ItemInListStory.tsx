"use client"
import { DoubleRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";


const { Text } = Typography;

interface Props{
    task?: any;
    goInternal?: () => void;
}

function ItemInListStory({
    task,
    goInternal
}:Props) {
    return (
        <div className='w-full mt-2 px-2 flex justify-between items-center h-[30px] border-2 border-b-teal-600'>
            <Text className="line-clamp-1">
                Title
            </Text>
            <button onClick={goInternal}>
                <DoubleRightOutlined 
                    className="cursor-pointer text-teal-600"
                />
            </button>
        </div>
    )
}

export default ItemInListStory