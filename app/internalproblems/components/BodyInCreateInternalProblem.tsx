"use client"

import { Col, DatePicker, Flex, Row, Select, Typography } from "antd";
import InputInternalBroblem from "./input/InputInternalBroblem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useProject from "@/app/hooks/useProject";
import { optionsStatus, optionsTypes } from "@/app/config/options";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextareaInternalBroblem from "./input/TextareaInternalBroblem";
import Button from "@/app/components/buttons/Button";
import { takeDataAddStatus } from "@/app/equation";
import { disableDateRanges } from "@/app/equation/datetime";
import useStory from "@/app/hooks/useStory";


const { Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props{
    story?: any;
    onClose: () => void;
}

function BodyInCreateInternalProblem({
    story,
    onClose
}:Props){

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: mutateStory } = useStory(story?.id);
    const {data: dataProject} = useProject(story?.projectId)

    const users = dataProject?.users;

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
            type: '',
            assignto: '',
            timework: []
        }
    });

    const status = watch('status');
    const assignto = watch('assignto');
    const image = watch('image');
    const timework = watch('timework');
    const type = watch('type');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(timework.length === 0){
            return toast.error('You need to complete the information!')
        }else{
            axios.post('/api/tasks', {
                ...data,
                storyId: story?.id,
                projectId: story?.projectId,
            })
            .then(() => {
                router.refresh();
                mutateStory();
                reset();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Internal problem in story has been created!')
            })
        }
        
    }

    const takenewStatus = takeDataAddStatus(dataProject?.addStatus)?.listInternal;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const configdate = {
        endDate: new Date(dataProject?.timework[1]),
        startDate:new Date(dataProject?.timework[0]),
    }

    return (
        <div className="w-full">
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
                        <Title level={4}>Create a task in story</Title>
                        <div className='mt-5'>
                            <Row justify={'space-between'} style={{width:'100%'}}>
                                <Col span={13}>
                                    <InputInternalBroblem
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
                                        <Title level={5}>Internal status</Title>
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
                                        <Title level={5}>Type</Title>
                                        <Select
                                            disabled={isLoading}
                                            onChange={(value) => setValue('type', value)}
                                            style={{ width: "100%" }}
                                            options={optionsTypes}
                                            value={type}
                                        />
                                    </Flex>
                                    <Flex vertical>
                                        <Title level={5}>Estimated time for work to be completed:</Title>
                                        <RangePicker 
                                            showTime 
                                            onChange={(value) => setValue('timework', value)}
                                            format={dateFormat}
                                            value={timework}
                                            disabledDate={disableDateRanges(configdate)}
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
                                    <TextareaInternalBroblem
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
                                            Create
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

export default BodyInCreateInternalProblem