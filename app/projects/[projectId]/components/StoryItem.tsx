"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineDelete, AiOutlineDoubleRight } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import { Modal, Select } from 'antd';
import { optionsStatus } from '@/app/config/options';
import { FieldValues, useForm } from 'react-hook-form';
import { InfoCircleOutlined } from '@ant-design/icons';
import useEpic from '@/app/hooks/useEpic';
import InforStory from './InforStory';
import useProject from '@/app/hooks/useProject';
import { takeDataAddStatus } from '@/app/equation';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import useUser from '@/app/hooks/useUser';

interface Props {
    story: any,
}

function StoryItem({
    story
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isModalOpenInfoStory, setIsModalOpenInfoStory] = useState(false);

    const handleOpenDelete = () => setIsOpenDelete(true);
    const {data: dataEpic, mutate: mutateEpic } = useEpic(story?.epicId as string);
    const {data: dataProject, mutate: mutateProject } = useProject(dataEpic?.projectId as string);
    const currentUser = useCurrentUser().data;
    const leader = dataProject?.projectLeader[dataProject?.projectLeader?.length -1]
    const userLeader = useUser(leader)?.data;

    const checkuser = () => {
        return story?.assignto == currentUser?.id || userLeader?.id == currentUser?.id ? false : true
    }

    const {
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: story?.title,
            status: story?.status,
            desc: story?.desc,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/storys/${story?.id}`, {
            status: data,
        })
            .then(() => {
                mutateProject();
                mutateEpic();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Story in Task has been updated!')
            });
    }
    
    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/storys/${story?.id}`)
            .then(() => {
                mutateEpic()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Story has been deleted!')
            })
    },[router, story?.id, mutateEpic()]);

    const handleGoToStorys = (ev: any) => {
        ev.preventDefault();
        return router.push(`/storys/${story?.id}`)
    };

    const styleBg = (story: any) => {
        return story?.status == 'Done' ? 'green' : (story?.status !== 'Done' &&  story?.status !== 'Todo') ? 'blue' : 'gray';
    }

    const takenewStatus = takeDataAddStatus(dataProject?.addStatus)?.listStory;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

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
                style={{background: `${styleBg(story)}`}}
            >
                <p
                    className='
                        line-clamp-1
                        pl-5
                    '
                >
                    {story?.title}
                </p>
                <div className='flex justify-center items-center'>
                    <div className='flex gap-2 justify-center items-center w-60'>
                        <span>status:</span>
                        <Select
                            disabled={checkuser()}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "60%" }}
                            options={[
                                ...optionsStatus,
                                ...mapNewStatus
                            ]}
                            className='style_status_story'
                            value={story?.status}
                        />
                    </div>
                    <div className='mx-2 hover:text-sky-700'>
                        <button className='text-2xl' onClick={() => setIsModalOpenInfoStory(true)}>
                            <InfoCircleOutlined />
                        </button>
                        <Modal 
                            title="Information Story" 
                            open={isModalOpenInfoStory} 
                            onCancel={() => setIsModalOpenInfoStory(false)}
                            width={700}
                        >
                            <InforStory story={story}/>
                        </Modal>
                    </div>
                    <button
                        className='
                            text-2xl
                            font-medium
                            pr-2
                        '
                        onClick={(e) => handleGoToStorys(e)}
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
                        disabled={checkuser()}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>  
        </>
    )
}

export default StoryItem