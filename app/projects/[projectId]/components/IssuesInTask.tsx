"use client"
import React, { useState } from 'react'
import IssuesList from './IssuesList';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Col, DatePicker, Flex, Row, Select, Typography } from 'antd';
import { optionsStatus } from '@/app/config/options';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import InputIssues from '../input/InputIssues';
import TextareaIssues from '../input/TextareaIssues';
import useIssues from '@/app/hooks/useIssues';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import useProject from '@/app/hooks/useProject';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import HeaderInTask from './HeaderInTask';
import { totalWorkTime } from '@/app/equation';


interface Props {
    title?: string | null;
    task?: any;
    listIssues?: any;
}

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

function IssuesInTask({
    title,
    task,
    listIssues
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalCreate = () => setIsModalOpen(!isModalOpen);

    const {data: dataTask, mutate: mutateIssues } = useIssues(task?.id as string);

    const {data: dataProject, mutate: mutateProject} = useProject(dataTask?.projectId)

    const users = dataProject?.users

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            desc: '',
            status: '',
            image: '',
            assignto: '',
            timework: []
        }
    });

    const status = watch('status');
    const assignto = watch('assignto');
    const image = watch('image');
    const timework = watch('timework');
    const desc = watch('desc');
    const textTitle = watch('title');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        (status && desc && textTitle && timework && assignto) ?
            axios.post('/api/issues', {
                ...data,
                taskId: task?.id
            })
            .then(() => {
                router.refresh();
                reset()
                mutateIssues()
                setIsModalOpen(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues has been created!')
            })
        : toast.error('You need to complete the information!')
    }

    const timeWork = totalWorkTime(listIssues)

    return (
        <div>
            <HeaderInTask 
                create={handleOpenModalCreate} 
                title={title}
                tasks={task}
            />
            {isModalOpen && (
                <div className='
                    my-2
                    py-2
                    h-fit
                    w-full
                    border-4
                    border-sky-600
                    flex
                    items-center
                    justify-between
                '>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className='px-2'>
                            <Title level={4}>Create a issues in Task</Title>
                            <div className='mt-5'>
                                <Row justify={'space-between'} style={{width:'100%'}}>
                                    <Col span={13}>
                                        <InputIssues
                                            disabled={isLoading}
                                            label="Title"
                                            id="title"
                                            errors={errors}
                                            required
                                            register={register}
                                        />
                                    </Col>
                                    <Col span={7}>
                                        <Flex vertical>
                                            <Title level={5}>Status issues</Title>
                                            <Select
                                                disabled={isLoading}
                                                onChange={(value) => setValue('status', value)}
                                                style={{ width: "100%" }}
                                                options={optionsStatus}
                                                value={status}
                                            />
                                        </Flex>
                                        <Flex vertical>
                                            <Title level={5}>Assign To</Title>
                                            <Select
                                                disabled={isLoading}
                                                onChange={(value) => setValue('assignto', value)}
                                                style={{ width: "100%" }}
                                                options={users?.map((user: any) => ({
                                                    value: user?.id,
                                                    label: user?.name
                                                }))}
                                                value={assignto}
                                            />
                                        </Flex>
                                        <Flex vertical>
                                            <Title level={5}>Set Time</Title>
                                            <RangePicker 
                                                showTime 
                                                onChange={(value) => setValue('timework', value)}
                                                format={dateFormat}
                                                value={timework}
                                            />
                                        </Flex>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col span={24}>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {image && <Image
                                                width="100"
                                                height="100"
                                                className="rounded"
                                                src={image}
                                                alt="Avatar"
                                            />}
                                            <CldUploadButton
                                                options={{ maxFiles: 1 }}
                                                onUpload={handleUpload}
                                                uploadPreset="jucsyqyi"
                                            >
                                                <div className='text-md flex justify-center items-center gap-4'> 
                                                    <span className='text-xl'>
                                                        <AiOutlineCloudUpload/>
                                                    </span>
                                                    Upload Image
                                                </div>
                                            </CldUploadButton>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col span={24}>
                                        <TextareaIssues
                                            disabled={isLoading}
                                            label="Description"
                                            id="desc"
                                            errors={errors}
                                            required
                                            register={register}
                                        />
                                    </Col>
                                </Row>
                                <Row className='mt-5'>
                                    <Col span={24}>
                                        <Flex className='gap-x-2' align={'center'} justify={'flex-end'}>
                                            <Button
                                                disabled={isLoading}
                                                onClick={() => setIsModalOpen(false)}
                                                type="button"
                                                secondary
                                            >
                                                Cancel
                                            </Button>
                                            <Button disabled={isLoading} type="submit">
                                                Create
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <div className='w-full flex flex-col mb-2'>
                <Title level={5}>1. Total time to complete the job in task</Title>
                <Text className='ml-5'>
                    {`${timeWork.days} days ${timeWork.hours} hours ${timeWork.minutes} minutes ${timeWork.seconds} seconds `}
                </Text>
            </div>
            <div className='w-full flex flex-col'>
                <Title level={5}>2. List issues</Title>
                <IssuesList task={task} listIssues={listIssues}/>
            </div>
        </div>
    )
}

export default IssuesInTask