"use client"
import { optionsStatus } from '@/app/config/options';
import { Epics } from '@prisma/client';
import { Modal, Select } from 'antd';
import { formatDistanceToNowStrict } from "date-fns";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusSquare } from 'react-icons/ai';
import DeleteModal from '../modal/DeleteModal';
import { InfoCircleOutlined } from "@ant-design/icons";
import { takeDataAddStatus, workCompletionRateFormula } from '@/app/equation';
import useEpic from '@/app/hooks/useEpic';
import InfoEpic from './InfoEpic';
import StoryInEpic from './StoryInEpic';
import useProject from '@/app/hooks/useProject';
import useCurrentUser from '@/app/hooks/useCurrentUser';


interface Props {
    epic?: Epics;
    userIdCreatedProject: any;
}

function EpicItem({ epic, userIdCreatedProject }: Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
    const [isModalOpenStoryInEpic, setIsModalOpenStoryInEpic] = useState(false);

    const handleOpenModalDelete = () => setIsModalOpenDelete(true);
    const {data: dataProject ,mutate: mutateProject } = useProject(epic?.projectId as string);
    const dataEpic = useEpic(epic?.id as string);
    const getdeep = dataEpic?.data?.storys;
    const currentUser = useCurrentUser().data;

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
            title: epic?.title,
            status: epic?.status,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/epics/${epic?.id}`, {
            status: data,
        })
            .then(() => {
                mutateProject();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Status in epic has been updated!')
            });
    }

    const createdAt = useMemo(() => {
        if (!epic?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(epic?.createdAt));
    }, [epic?.createdAt])

    const completePrecent: any = Number(workCompletionRateFormula(getdeep).toFixed(3));
    const unfinishedPercent = 100 - completePrecent;

    const takenewStatus = takeDataAddStatus(dataProject?.addStatus)?.listEpic;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];
    
    return (
        <>
            <DeleteModal
                epicId={epic?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
            />
            <div className='
                my-2
                h-16
                w-full
                border
                rounded
                border-teal-600
                cursor-pointer
                hover:bg-teal-500
                hover:text-white
                flex
                flex-col
                justify-between
            '>
                <div className='
                    flex
                    items-center
                    justify-between
                '>
                    <p
                        className='
                            line-clamp-1
                            pl-5
                        '
                    >
                        {epic?.title}
                    </p>
                    <div className='flex justify-center items-center'>
                        <div className='flex gap-2 justify-center items-center w-60'>
                            <span>status:</span>
                            <Select
                                disabled={currentUser?.id == userIdCreatedProject ? false : true}
                                onChange={handleChangeOptionStatus}
                                style={{ width: "60%" }}
                                options={[
                                    ...optionsStatus,
                                    ...mapNewStatus
                                ]}
                                value={epic?.status}
                            />
                        </div>
                        <div className='mx-2 mt-1.5 hover:text-sky-700'>
                            <button className='text-2xl' onClick={()=>setIsModalOpenStoryInEpic(true)}>
                                <AiOutlinePlusSquare />
                            </button>
                            <Modal 
                                title="Story Epic" 
                                open={isModalOpenStoryInEpic} 
                                onCancel={() => setIsModalOpenStoryInEpic(false)}
                                onOk={() => setIsModalOpenStoryInEpic(false)}
                                width={1200}
                            >
                                <StoryInEpic 
                                    title={epic?.title}
                                    epic={epic}
                                    listStory={getdeep}
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
                                <InfoEpic
                                    createdAt={createdAt}
                                    createdBy={epic?.creatorId}
                                    title={epic?.title}
                                    projectId={epic?.projectId}
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
                {(completePrecent || unfinishedPercent) ? <div className='
                    w-full
                    h-4
                    flex
                    text-sm
                '>
                    <div 
                        style={{
                            width: `${completePrecent}%`,
                            height: '100%',
                        }}
                        className='flex text-white justify-center items-center bg-lime-500'
                    >
                        {completePrecent === 0 ? null : (completePrecent+"%")}
                    </div>
                    <div 
                        style={{
                            width: `${unfinishedPercent}%`,
                            height: '100%',
                        }}
                        className='flex text-white justify-center items-center bg-[#FF0000]'
                    >
                        {unfinishedPercent === 0 ? null : (unfinishedPercent+"%")}
                    </div>
                </div>: null}
            </div>
        </>
    )
}

export default EpicItem