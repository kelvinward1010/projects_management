"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Col, DatePicker, Flex, Row, Select, Typography } from 'antd';
import { optionsStatus } from '@/app/config/options';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import InputStory from '../input/InputStory';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import useProject from '@/app/hooks/useProject';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import HeaderInTask from './HeaderInEpic';
import { takeDataAddStatus, totalWorkTime } from '@/app/equation';
import useEpic from '@/app/hooks/useEpic';
import StoryList from './StoryList';
import TextareaStory from '../input/TextareaStory';
import { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';


interface Props {
    title?: string | null;
    epic?: any;
    listStory?: any;
}

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

function StoryInEpic({
    title,
    epic,
    listStory
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModalCreate = () => setIsModalOpen(!isModalOpen);
    const {data: dataEpic, mutate: mutateEpic } = useEpic(epic?.id as string);
    const {data: dataProject, mutate: mutateProject} = useProject(dataEpic?.projectId)
    const users = dataProject?.users;
    const timeWork = totalWorkTime(listStory);
    const takenewStatus = takeDataAddStatus(dataProject?.addStatus)?.listStory;
 
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
            axios.post('/api/storys', {
                ...data,
                epicId: epic?.id,
                projectId: dataEpic?.projectId,
            })
            .then(() => {
                router.refresh();
                reset();
                mutateProject();
                mutateEpic();
                setIsModalOpen(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Story has been created!')
            })
        : toast.error('You need to complete the information!')
    }

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const configdate = {
        endDate: new Date('2024-01-01T24:22:08.621Z'),
        startDate:new Date(dataProject?.createdAt),
    }
    
    function disableDateRanges() {
        const { startDate, endDate } = configdate;
        return function disabledDate(current: any) {
            let startCheck = true;
            let endCheck = true;
            if (startDate) {
                startCheck = current && current < moment(startDate, dateFormat);
            }
            if (endDate) {
                endCheck = current && current > moment(endDate, dateFormat);
            }
            return (startDate && startCheck) || (endDate && endCheck);
        };
    }

    return (
        <div>
            <HeaderInTask 
                create={handleOpenModalCreate} 
                title={title}
                epic={epic}
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
                            <Title level={4}>Create a story in Epic</Title>
                            <div className='mt-5'>
                                <Row justify={'space-between'} style={{width:'100%'}}>
                                    <Col span={13}>
                                        <InputStory
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
                                            <Title level={5}>Status story</Title>
                                            <Select
                                                disabled={isLoading}
                                                onChange={(value) => setValue('status', value)}
                                                style={{ width: "100%" }}
                                                options={[
                                                    ...optionsStatus,
                                                    ...mapNewStatus
                                                ]}
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
                                            <Title level={5}>Estimated time for work to be completed:</Title>
                                            <RangePicker 
                                                showTime 
                                                onChange={(value) => setValue('timework', value)}
                                                format={dateFormat}
                                                value={timework}
                                                disabledDate={disableDateRanges()}
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
                                        <TextareaStory
                                            disabled={isLoading}
                                            label="Description"
                                            id="desc"
                                            errors={errors}
                                            required
                                            register={register}
                                        />
                                        {/* <ReactQuill theme="snow" onChange={(value) => setValue('desc', value)} /> */}
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
                <Title level={5}>1. Total time to complete the job in Epic</Title>
                <Text className='ml-5'>
                    {`${timeWork.days} days ${timeWork.hours} hours ${timeWork.minutes} minutes ${timeWork.seconds} seconds `}
                </Text>
            </div>
            <div className='w-full flex flex-col'>
                <Title level={5}>2. List story</Title>
                <StoryList listStory={listStory}/>
            </div>
        </div>
    )
}

export default StoryInEpic