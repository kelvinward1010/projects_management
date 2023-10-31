"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineDelete, AiOutlineDoubleRight } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import useIssues from '@/app/hooks/useIssues';
import { Modal, Select } from 'antd';
import { optionsStatus } from '@/app/config/options';
import { FieldValues, useForm } from 'react-hook-form';
import { Tasks } from '@prisma/client';
import { InfoCircleOutlined } from '@ant-design/icons';
import InforIssue from './InforIssue';

interface Props {
    issue: any,
    task: Tasks,
}

function IssuesItem({
    issue,
    task
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isModalOpenInfoIssue, setIsModalOpenInfoIssue] = useState(false);

    const handleOpenDelete = () => setIsOpenDelete(true);
    const {mutate: mutateIssues } = useIssues(issue?.taskId as string);


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
            title: issue?.title,
            status: issue?.status,
            desc: issue?.desc,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/issues/${issue?.id}`, {
            status: data,
        })
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues in Task has been updated!')
            });
    }
    
    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/issues/${issue?.id}`)
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Issues has been deleted!')
            })
    },[router, issue?.id]);

    const handleGoToIssues = (ev: any) => {
        ev.preventDefault();
        return router.push(`/issues/${issue?.id}`)
    };

    const styleBg = (issue: any) => {
        return issue?.status == 'Done' ? 'green' : issue?.status == 'Improgress' ? 'blue' : 'gray';
    }


    return (
        <>
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
                    text-white
                    hover:bg-teal-700
                    hover:text-white
                '
                style={{background: `${styleBg(issue)}`}}
            >
                <p
                    className='
                        line-clamp-1
                        pl-5
                    '
                >
                    {issue?.title}
                </p>
                <div className='flex justify-center items-center'>
                    <div className='flex gap-2 justify-center items-center w-60'>
                        <span>status:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "60%" }}
                            options={optionsStatus}
                            value={issue?.status}
                        />
                    </div>
                    <div className='mx-2 hover:text-sky-700'>
                        <button className='text-2xl' onClick={() => setIsModalOpenInfoIssue(true)}>
                            <InfoCircleOutlined />
                        </button>
                        <Modal 
                            title="Information Issue" 
                            open={isModalOpenInfoIssue} 
                            onCancel={() => setIsModalOpenInfoIssue(false)}
                            width={700}
                        >
                            <InforIssue issue={issue}/>
                        </Modal>
                    </div>
                    <button
                        className='
                            text-2xl
                            font-medium
                            pr-2
                        '
                        onClick={(e) => handleGoToIssues(e)}
                    >
                        <AiOutlineDoubleRight />
                    </button>
                    {isOpenDelete && 
                    <div className='h-fit w-fit p-2 flex gap-2 justify-center items-center'>
                        <Button
                            disabled={isLoading}
                            danger
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={() => setIsOpenDelete(false)}
                        >
                            Cancel
                        </Button>
                    </div>}
                    <button
                        className='
                            text-2xl
                            hover:text-red-600
                            font-medium
                            pr-2
                        '
                        onClick={handleOpenDelete}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>  
        </>
    )
}

export default IssuesItem