"use client"
import { DoubleRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useRouter } from "next/navigation";
import { AiFillBug, AiFillLeftSquare } from "react-icons/ai";


const { Text } = Typography;

interface Props{
    task?: any;
}

function ItemInListStory({
    task,
}:Props) {
    const router = useRouter();
    const Icon = () => {
        const iconType = task?.type === 'Bug' ? 
            <Text className="text-xl text-red-600">
                <AiFillBug /> 
            </Text>
            : 
            <Text className="text-xl text-green-600">
                <AiFillLeftSquare />
            </Text>
        return iconType
    }
    return (
        <div className='w-full mt-2 px-2 flex justify-between items-center h-[30px] border-2 border-b-teal-600'>
            <div className="flex flex-start items-center gap-x-2">
                {Icon()}
                <Text className="line-clamp-1">
                    {task?.title}
                </Text>
            </div>
            <DoubleRightOutlined 
                className="cursor-pointer text-teal-600"
                onClick={() => router?.push(`/tasks/${task?.id}`)}
            />
        </div>
    )
}

export default ItemInListStory