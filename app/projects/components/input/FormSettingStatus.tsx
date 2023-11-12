"use client"

import { Col, Flex, Row, Typography } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputSettings from "./InputSettings";
import Button from "@/app/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const { Title, Text } = Typography;
interface Props{
    isEpics?: boolean;
    isInternals?: boolean;
    isStorys?: boolean;
    projectId?: string;
    onClose?: () => void;
}

function FormSettingStatus({
    isEpics,
    isInternals,
    isStorys,
    projectId,
    onClose
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            label: '',
            value: '',
        }
    });

    const label = watch("label");
    const value = watch("value");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if(label !== value){
            reset();
            toast.error('Fill in value and label the same!');
            setIsLoading(false);
            return;
        };

        {isEpics &&  axios.post('/api/addstatus', {
            ...data,
            isForEpics: true,
            projectId: projectId,
        })
            .then(() => {
                router.refresh();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success(`Status for epic has been updated!`)
            });}
        {isInternals &&  axios.post('/api/addstatus', {
            ...data,
            isForInternals: true,
            projectId: projectId,
        })
            .then(() => {
                router.refresh();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success(`Status for internal has been updated!`)
            });}
        {isStorys &&  axios.post('/api/addstatus', {
            ...data,
            isForStorys: true,
            projectId: projectId,
        })
            .then(() => {
                router.refresh();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success(`Status for story has been updated!`)
            });}
    }

    

    return (
        <>
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
                        <Text>Fill in value and label the same</Text>
                        <div className='mt-5'>
                            <Row justify={'space-between'} style={{width:'100%'}}>
                                <Col span={10}>
                                    <InputSettings
                                        disabled={isLoading}
                                        label="Label"
                                        id="label"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                                <Col span={10}>
                                    <InputSettings
                                        disabled={isLoading}
                                        label="Value"
                                        id="value"
                                        errors={errors}
                                        required
                                        register={register}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col span={24}>
                                    <Flex className='gap-x-2' align={'center'} justify={'flex-end'}>
                                        <Button onClick={onClose} disabled={isLoading} type="submit">
                                            Create
                                        </Button>
                                    </Flex>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormSettingStatus