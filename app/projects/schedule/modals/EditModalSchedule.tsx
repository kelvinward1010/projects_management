"use client"
import { Col, Flex, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputScheduleConversation from "../InputScheduleConversation";
import { CldUploadButton } from "next-cloudinary";
import { AiFillPicture } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/buttons/Button";
import Image from "next/image";


const { Title, Text } = Typography;

interface ConfirmModalProps {
    onClose: () => void;
    schedule?: any;
}


function EditModalSchedule({
    onClose,
    schedule
}:ConfirmModalProps) {

    const router = useRouter();
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
            content: schedule?.content,
            image: schedule?.image,
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(`/api/schedules/${schedule?.id}`, {
            ...data,
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Schedule conversation has been updated!')
            });
    }

    return (
        <div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                    <InputScheduleConversation
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
                            <Button disabled={isLoading} type="submit">
                                Update
                            </Button>
                        </Flex>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default EditModalSchedule