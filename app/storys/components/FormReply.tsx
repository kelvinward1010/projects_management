"use client"

import { Col, Flex, Row, Typography } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputComment from "./InputComment";
import Button from "@/app/components/buttons/Button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import { AiFillPicture } from "react-icons/ai";

interface Props {
    comment?: any;
    onClose: () => void;
}

function FormReply({
    comment,
    onClose
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
            content: '',
            image: '',
        }
    });

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/replys', {
            ...data,
            commentId: comment?.id
        })
            .then(() => {
                router.refresh();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Reply has been created!')
            });
    }
    
    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2 flex justify-between items-center">
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
                        <Button disabled={isLoading} onClick={onClose} type="button" danger>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} type="submit">
                            Reply
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </form>
    )
}

export default FormReply