"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Avatar, Col,Modal,Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as _ from "lodash/fp";
import {  EditOutlined} from '@ant-design/icons';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputEdit from '../input/InputEdit';
import useUsers from '@/app/hooks/useUsers';

interface Props {
    user?: any;
}

const { Title, Text } = Typography;

function BodyEditUser({
    user,
}:Props) {
    const router = useRouter();
    const {mutate: mutateUsers} = useUsers();
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
            name: user?.name,
            name_Id: user?.name_id,
            image: user?.image,
            email: user?.email,
        }
    });

    const name = watch('name');
    const name_Id = watch('name_Id');
    const image = watch('image');
    const email = watch('email');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const handleEditUsers = () => {
        axios.post(`/api/users/${user?.id}`, {
            name: name,
            name_Id: name_Id,
            image: image,
            email: email,
        })
            .then(() => {
                router.refresh();
                mutateUsers();
                setIsModalOpenEdit(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('User has been updated!')
            });
    }

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="User Edit" 
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
                            <Row justify={'space-between'}>
                                <Col span={10}>
                                    <Title level={5}>Name</Title>
                                    <InputEdit
                                        id="name"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                                <Col span={10}>
                                    <Title level={5}>Name ID</Title>
                                    <InputEdit
                                        id="name_Id"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Title level={5}>Name</Title>
                                    <InputEdit
                                        id="email"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                            </Row>
                            <div className="mt-5 gap-x-3">
                                <Title level={5}>Avatar</Title>
                                <div className='flex items-center gap-x-5'>
                                    {image && <Avatar size={'large'} src={image}/>}
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
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleEditUsers} className="
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

export default BodyEditUser