"use client"
import { optionsStatus } from "@/app/config/options";
import useIssues from "@/app/hooks/useIssues";
import { Col, Row, Select, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const { Title, Text } = Typography;

interface Props {
    issue?: any;
}

function BodyIssues({
    issue
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {mutate: mutateIssues } = useIssues(issue?.taskId as string);

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
            title: issue?.title,
            status: issue?.status,
            desc: issue?.desc,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/issues/${issue?.id}`, {
            status: data,
        })
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues in Task has been updated!')
            });
    }

    return (
        <Row className="p-5 h-fit w-full" justify={'space-between'}>
            <Col span={17} className="border-2 border-teal-600">
                <div>
                    <Title className="my-3" level={3}>Description Issues:</Title>
                    <Text className="
                        text-xl
                        px-5
                    ">{issue?.desc}</Text>
                </div>
            </Col>
            <Col span={5} className="border-2 border-teal-600 py-5">
                <div className='flex gap-2 justify-center items-center w-60'>
                    <span>status:</span>
                    <Select
                        disabled={isLoading}
                        onChange={handleChangeOptionStatus}
                        style={{ width: "60%" }}
                        options={optionsStatus}
                        value={issue?.status}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default BodyIssues