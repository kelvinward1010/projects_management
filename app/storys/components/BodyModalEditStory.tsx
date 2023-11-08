"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Col, Flex, Row, Select, Typography } from 'antd';
import { optionsStatus } from '@/app/config/options';
import Button from '@/app/components/buttons/Button';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import InputIssues from '@/app/projects/[projectId]/input/InputStory';
import TextareaIssues from '@/app/projects/[projectId]/input/TextareaStory';

interface Props {
    title?: string | null;
    isOpen: boolean;
    onSubmit: (data: any) => void;
    story?: any;

}

const { Title } = Typography;

function BodyModalEditStory({
    title,
    isOpen,
    onSubmit,
    story,
}:Props) {

    const [isLoading, setIsLoading] = useState(false);

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
            title: story?.title,
            desc: story?.desc,
            status: story?.status,
            image: story?.image,
        }
    });

    const status = watch('status');
    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    return (
        <div>
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
                        <Title level={4}>Edit story</Title>
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
                                        <Title level={5}>Status story</Title>
                                        <Select
                                            disabled={isLoading}
                                            onChange={(value) => setValue('status', value)}
                                            style={{ width: "100%" }}
                                            options={optionsStatus}
                                            value={status}
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
                                        <Button disabled={isLoading} type="submit">
                                            Update Story
                                        </Button>
                                    </Flex>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BodyModalEditStory