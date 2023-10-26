"use client"
import { optionsStatus } from '@/app/config/options';
import { Tasks } from '@prisma/client';
import { Modal, Select, Typography } from 'antd';
import { formatDistanceToNowStrict } from "date-fns";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillSliders, AiOutlineDelete, AiOutlinePlusSquare } from 'react-icons/ai';
import DeleteModal from '../modal/DeleteModal';
import { InfoCircleOutlined } from "@ant-design/icons";
import Info from './Info';
import IssuesInTask from './IssuesInTask';
import useIssues from '@/app/hooks/useIssues';
import BoardInTask from './board/BoardInTask';

interface Props {
    task?: Tasks;
}

function TaskItem({ task }: Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
    const [isModalOpenIssuesInTask, setIsModalOpenIssuesInTask] = useState(false);
    const [isModalOpenBoard, setIsModalOpenBoard] = useState(false);



    const handleOpenModalDelete = () => setIsModalOpenDelete(true);

    const dataIssues = useIssues(task?.id as string);
    const getdeep = dataIssues?.data?.issues;

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

    const createdAt = useMemo(() => {
        if (!task?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(task?.createdAt));
    }, [task?.createdAt])

    
    return (
        <>
            <DeleteModal
                taskId={task?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
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
                hover:bg-teal-500
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
                    <div className='flex gap-2 justify-center items-center w-60'>
                        <span>status:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "60%" }}
                            options={optionsStatus}
                            value={task?.status}
                        />
                    </div>
                    <div className='mx-2 mt-1.5 hover:text-sky-700'>
                        <button
                            className='
                                text-2xl
                            '
                            onClick={() => setIsModalOpenBoard(true)}
                        >
                            <AiFillSliders />
                        </button>
                        <Modal 
                            title="Board for Task" 
                            open={isModalOpenBoard} 
                            onCancel={() => setIsModalOpenBoard(false)}
                            onOk={() => setIsModalOpenBoard(false)}
                            width={1500}
                        >
                            <BoardInTask task={getdeep}/>
                        </Modal>
                    </div>
                    <div className='mx-2 mt-1.5 hover:text-sky-700'>
                        <button className='text-2xl' onClick={()=>setIsModalOpenIssuesInTask(true)}>
                            <AiOutlinePlusSquare />
                        </button>
                        <Modal 
                            title="Issues Task" 
                            open={isModalOpenIssuesInTask} 
                            onCancel={() => setIsModalOpenIssuesInTask(false)}
                            onOk={() => setIsModalOpenIssuesInTask(false)}
                            width={1200}
                        >
                            <IssuesInTask 
                                title={task?.title}
                                task={task}
                                listIssues={getdeep}
                            />
                        </Modal>
                    </div>
                    <div className='mx-2 hover:text-sky-700'>
                        <button className='text-2xl' onClick={() => setIsModalOpenInfo(true)}>
                            <InfoCircleOutlined />
                        </button>
                        <Modal 
                            title="Information Task" 
                            open={isModalOpenInfo} 
                            onCancel={() => setIsModalOpenInfo(false)}
                        >
                            <Info 
                                createdAt={createdAt}
                                createdBy={task?.creatorId}
                                title={task?.title}
                                projectId={task?.projectId}
                            />
                        </Modal>
                    </div>
                    <button
                        className='
                            text-2xl
                            hover:text-red-600
                            font-medium
                            pr-2
                        '
                        onClick={handleOpenModalDelete}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskItem