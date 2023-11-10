"use client"
import { DoubleRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useRouter } from "next/navigation";


const { Text } = Typography;

interface Props{
    task?: any;
}

function ItemInListStory({
    task,
}:Props) {
    const router = useRouter();
    return (
        <div className='w-full mt-2 px-2 flex justify-between items-center h-[30px] border-2 border-b-teal-600'>
            <Text className="line-clamp-1">
                {task?.title}
            </Text>
            <DoubleRightOutlined 
                className="cursor-pointer text-teal-600"
                onClick={() => router?.push(`/tasks/${task?.id}`)}
            />
        </div>
    )
}

export default ItemInListStory