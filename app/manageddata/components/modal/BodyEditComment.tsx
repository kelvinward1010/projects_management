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
import useManageddata from '@/app/hooks/useMannageddata';

interface Props {
    comment?: any;
}

const { Title, Text } = Typography;

function BodyEditComment({
    comment,
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
            content: comment?.content_cmt,
            image: comment?.image_cmt,
        }
    });

    const content = watch('content');
    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const handleEditComment = () => {
        axios.post(`/api/comments/${comment?.id}`, {
            content: content,
            image: image
        })
            .then(() => {
                router.refresh();
                mutateAll();
                setIsModalOpenEdit(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Comment has been updated!')
            });
    }

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="Comment Edit" 
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
                                        id="content"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <button onClick={handleEditComment} className="
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

export default BodyEditComment