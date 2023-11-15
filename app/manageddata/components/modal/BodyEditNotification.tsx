"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Col, Flex,Modal,Row, Select, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as _ from "lodash/fp";
import {  EditOutlined} from '@ant-design/icons';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import TextareaEdit from '../input/TextareaEdit';
import InputEdit from '../input/InputEdit';
import useManageddata from '@/app/hooks/useMannageddata';

interface Props {
    notification?: any;
}

const { Title, Text } = Typography;

function BodyEditNotification({
    notification,
}:Props) {
    const router = useRouter();
    const {mutate: mutateAll} = useManageddata();
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    
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
            title: notification?.name_noti,
            desc: notification?.descNoti,
        }
    });

    const title = watch('title');
    const desc = watch('desc');

    const handleNotiEdit = () => {
        axios.post(`/api/notifications/${notification?.id}`, {
            title: title,
            desc: desc
        })
            .then(() => {
                router.refresh();
                mutateAll();
                setIsModalOpenEdit(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Notification has been updated!')
            });
    }

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="Notification Edit" 
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
                            <Row className='mt-4 w-full'>
                                <InputEdit
                                    id="title"
                                    errors={errors}
                                    required
                                    register={register}
                                />
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
                <button onClick={handleNotiEdit} className="
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

export default BodyEditNotification