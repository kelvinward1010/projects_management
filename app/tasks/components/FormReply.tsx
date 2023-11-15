"use client"

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
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
import Image from "next/image";

const { Title, Text } = Typography;

interface Props {
    currentUser?: User;
    comment?: any;
    onClose: () => void;
}

function FormReply({
    currentUser,
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

    const image = watch('image');

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
                onClose();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Reply has been created!')
            });
    }

    return (
        <form className="w-full mt-5" onSubmit={handleSubmit(onSubmit)}>
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