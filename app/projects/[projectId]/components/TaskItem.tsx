"use client"
import { optionsStatus } from '@/app/config/options';
import { Tasks } from '@prisma/client';
import { Collapse, Select } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteModal from '../modal/DeleteModal';

interface Props {
    task?: Tasks;
}

function TaskItem({ task }: Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalCreate = () => setIsModalOpen(true);
    

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: task?.title,
            status: task?.status,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/tasks/${task?.id}`, {
            status: data,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Status in Task has been updated!')
            });
    }
    
    return (
        <>
            <DeleteModal
                taskId={task?.id}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className='
                my-2
                h-12
                w-full
                border-2
                border-teal-600
                flex
                items-center
                justify-between
                cursor-pointer
                hover:bg-teal-700
                hover:text-white
            '>
                <p
                    className='
                        line-clamp-1
                        pl-5
                    '
                >
                    {task?.title}
                </p>
                <div className='flex justify-center items-center'>
                    <div className='flex gap-2 justify-center items-center w-72'>
                        <span>status:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "40%" }}
                            options={optionsStatus}
                            value={task?.status}
                        />
                    </div>
                    <button
                        className='
                            text-2xl
                            hover:text-red-600
                            font-medium
                            pr-2
                        '
                        onClick={handleOpenModalCreate}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskItem