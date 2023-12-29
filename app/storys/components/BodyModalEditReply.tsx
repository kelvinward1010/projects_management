"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Col, Flex, Row, Typography } from 'antd';
import Button from '@/app/components/buttons/Button';
import Avatar from '@/app/components/Avatar';
import InputComment from './InputComment';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';
import { AiFillPicture } from 'react-icons/ai';
import Image from 'next/image';

interface Props {
    currentUser?: User;
    onSubmit: (data: any) => void;
    reply?: any;

}

const { Text } = Typography;

function BodyModalEditReply({
    onSubmit,
    reply,
    currentUser
}:Props) {

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
            content: reply?.content,
            image: reply?.image,
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Flex justify={'flex-start'} align={'center'}>
                <Avatar 
                    user={currentUser as User} 
                    image={currentUser?.profileImage || currentUser?.image}
                />
                <div className="flex justify-center gap-2 items-center ml-4">
                    <Text className="text-xl font-semibold">{currentUser?.name}</Text>
                    <Text className="text-xl">@{currentUser?.name_Id}</Text>
                </div>
            </Flex>
            <div className="my-5 pl-10">
                {image && <Image
                    width="200"
                    height="150"
                    className="rounded"
                    src={image}
                    alt="Image Comment"
                />}
            </div>
            <div className="mt-5 flex justify-between items-center">
                <div className="mt-2 flex items-center gap-x-3">
                    <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onUpload={handleUpload}
                        uploadPreset="jucsyqyi"
                    >
                        <div className='text-4xl text-sky-500 flex justify-center items-center gap-4'> 
                            <AiFillPicture />
                        </div>
                    </CldUploadButton>
                </div>
                <InputComment
                    id="content"
                    register={register}
                    errors={errors}
                    required
                    placeholder={"Writing your emotion ..."}
                />
            </div>
            <Row className='mt-5'>
                <Col span={24}>
                    <Flex className='gap-x-2' align={'center'} justify={'flex-end'}>
                        <Button type="submit">
                            Update Reply
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </form>
    )
}

export default BodyModalEditReply