"use client"
import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { AiFillBug, AiFillLeftSquare } from 'react-icons/ai';
import DeleteTask from './modal/DeleteTask';

const { Title, Text} = Typography;

interface Props{
    task?: any;
}

function HeaderTask({
    task
}:Props) {

    const [isModalOpenDelete,setIsModalOpenDelete] = useState(false);

    const TitleCustom = (task: any) => {
        const iconType = task?.type === 'Bug' ? 
            <Text className="text-2xl text-red-600">
                <AiFillBug /> 
            </Text>
            : 
            <Text className="text-2xl text-green-600">
                <AiFillLeftSquare />
            </Text>
        return iconType
    }

    return (
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
            <Title level={4} className='line-clamp-1 flex items-center justify-center gap-2'>{TitleCustom(task)} {task?.title}</Title>
            <div className='flex items-center justify-center'>
                <div className='mx-5'>
                    <button
                        className="
                            w-40
                            h-9
                            bg-red-600
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
                        Delete
                    </button>
                    <Modal 
                        title={`Title task: ${task?.title}`} 
                        open={isModalOpenDelete} 
                        onCancel={() => setIsModalOpenDelete(false)}
                        className="modal-edit"
                    >
                        <DeleteTask 
                            onClose={() => setIsModalOpenDelete(false)}
                            task={task}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default HeaderTask