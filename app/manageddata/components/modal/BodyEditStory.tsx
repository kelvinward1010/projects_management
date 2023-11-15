"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Col,DatePicker,Flex,Modal,Row, Select, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as _ from "lodash/fp";
import {  EditOutlined} from '@ant-design/icons';
import InputEdit from '../input/InputEdit';
import { optionsStatus } from '@/app/config/options';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useProject from '@/app/hooks/useProject';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import TextareaEdit from '../input/TextareaEdit';
import useManageddata from '@/app/hooks/useMannageddata';

interface Props {
    story?: any;
}

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

function BodyEditStory({
    story,
}:Props) {
    const router = useRouter();
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const {mutate: mutateAll} = useManageddata();
    const {data: dataProject, mutate: mutateProject} = useProject(story?.projectId)

    const users = dataProject?.users;

    const {
        register,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: story?.name_st,
            status: story?.status_st,
            desc: story?.desc_st,
            image: story?.image_st,
            assignto: story?.assignto_st,
            timework: story?.timework_st,
        }
    });

    const status = watch('status');
    const image = watch('image');
    const timework = watch('timework');
    const assignto = watch('assignto');
    const desc = watch('desc');
    const title = watch('title');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onChange = (date: any, dateString: any) => {
        setValue('timework', date)
    };

    const handleEpicStory = () => {
        axios.post(`/api/storys/${story?.id}`, {
            title: title,
            status: status,
            desc: desc,
            assignto: assignto,
            timework: timework,
            image: image
        })
            .then(() => {
                router.refresh();
                mutateAll();
                setIsModalOpenEdit(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Story has been updated!')
            });
    }

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="Story Edit" 
                open={isModalOpenEdit} 
                onCancel={() =>setIsModalOpenEdit(false)}
                className="modal-edit w-full"
                width={1200}
            >
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
                    <div className='px-2 w-full'>
                        <div className='mt-5'>
                            <Row justify={'space-between'} style={{width:'100%'}}>
                                <Col span={13}>
                                    <InputEdit
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
                                            onChange={(value) => setValue('status', value)}
                                            style={{ width: "100%" }}
                                            options={[
                                                ...optionsStatus,
                                            ]}
                                            value={status}
                                        />
                                    </Flex>
                                    <Flex vertical>
                                        <Title level={5}>Assign To</Title>
                                        <Select
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
                                        {timework && <RangePicker 
                                            showTime 
                                            onChange={onChange} 
                                            defaultValue={
                                                [dayjs(timework[0], dateFormat), dayjs(timework[1], dateFormat)]
                                                || null
                                            }
                                            format={dateFormat}
                                            className="date-picker"
                                        />}
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
                            <Row className='mt-4 w-full'>
                                <Col span={24}>
                                    <TextareaEdit
                                        id="desc"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <button onClick={handleEpicStory} className="
                    w-32
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                    mt-5
                ">
                    Submit
                </button>
            </Modal>
        </>
    )
}

export default BodyEditStory