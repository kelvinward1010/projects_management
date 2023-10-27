"use client"

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import { Col, Flex, Row, Typography } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import InputComment from "./InputComment";
import Button from "@/app/components/buttons/Button";
import { useState } from "react";

const { Title, Text } = Typography;

interface Props {
    currentUser?: User;
}

function FormComment({
    currentUser
}:Props) {

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            content: '',
            image: '',
        }
    });

    return (
        <>
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
            <div className="mt-5">
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
                        <Button disabled={isLoading} type="submit">
                            Comment
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </>
    )
}

export default FormComment