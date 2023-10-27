"use client"
import { optionsStatus } from "@/app/config/options";
import useIssues from "@/app/hooks/useIssues";
import { Col, Modal, Row, Select, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import BodyModalEditIssues from "./BodyModalEditIssues";
import FormComment from "./FormComment";


const { Title, Text } = Typography;

interface Props {
    issue?: any;
    currentUser?: any;
}

function BodyIssues({
    issue,
    currentUser
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {mutate: mutateIssues } = useIssues(issue?.taskId as string);
    const [isModalOpenEditIssue, setIsModalOpenEditIssue] = useState(false);

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
            image: issue?.image,
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(`/api/issues/${issue?.id}`, {
            ...data,
        })
            .then(() => {
                router.refresh();
                mutateIssues()
                setIsModalOpenEditIssue(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues has been updated!')
            });
    }

    return (
        <>
            <Row className="p-5 h-fit w-full" justify={'space-between'}>
                <Col span={17} className="border-2 border-teal-600">
                    <div>
                        <Row className="my-3" justify={'space-between'}>
                            <Col className="ml-4" span={16}>
                                <Title level={3}>Description Issues:</Title>
                            </Col>
                            <Col span={2}>
                                <button 
                                    className='
                                        w-24
                                        h-9
                                        bg-teal-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                    ' 
                                    onClick={()=>setIsModalOpenEditIssue(true)}
                                >
                                    <AiFillEdit /> Edit
                                </button>
                                <Modal 
                                    title="Issues Task" 
                                    open={isModalOpenEditIssue} 
                                    onCancel={() => setIsModalOpenEditIssue(false)}
                                    className="modal-edit"
                                    width={1200}
                                >
                                    <BodyModalEditIssues 
                                        isOpen={isModalOpenEditIssue}
                                        onSubmit={onSubmit}
                                        issue={issue}
                                    />
                                </Modal>
                            </Col>
                        </Row>
                        <div className="h-fit gap-2 p-10 w-full flex flex-col items-center-justify-center">
                            {issue?.image && <Image
                                width="400"
                                height="200"
                                className="rounded m-auto"
                                src={issue?.image}
                                alt="Avatar"
                            />}
                            <Text className="
                                text-xl
                                px-5
                            ">
                                {issue?.desc}
                            </Text>
                        </div>
                        <Row>
                            <Col span={24} className="border-2 border-t-teal-600 p-10">
                                <FormComment currentUser={currentUser} />
                            </Col>
                        </Row>
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
        </>
    )
}

export default BodyIssues