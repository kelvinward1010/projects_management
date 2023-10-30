"use client"
import { optionsStatus } from "@/app/config/options";
import useIssues from "@/app/hooks/useIssues";
import { Col, DatePicker, Modal, Row, Select, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import BodyModalEditIssues from "./BodyModalEditIssues";
import FormComment from "./FormComment";
import CommentList from "./CommentList";
import useProject from "@/app/hooks/useProject";
import useUser from "@/app/hooks/useUser";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { daysdifference } from "@/app/equation";


const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

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
    const {data: dataTask, mutate: mutateIssues } = useIssues(issue?.taskId as string);
    const [isModalOpenEditIssue, setIsModalOpenEditIssue] = useState(false);
    const {data: dataProject} = useProject(dataTask?.projectId);
    const {data: user} = useUser(issue?.userId);

    const users = dataProject?.users
    
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
            assignto: issue?.assignto,
            timework: issue?.timework,
        }
    });

    const assignto = watch('assignto');

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

    const handleChangeOptionAssign = (data: any) => {
        setIsLoading(true);
        setValue('assignto', data)

        axios.post(`/api/issues/${issue?.id}`, {
            assignto: data,
        })
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Assigned user has been updated!')
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

    const onChange = (date: any, dateString: any) => {

        setIsLoading(true);
        setValue('timework', date)

        axios.post(`/api/issues/${issue?.id}`, {
            timework: date,
        })
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Time has been updated!')
            });
    };

    const getTime = daysdifference(issue?.timework[0],issue?.timework[1])

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
                                <FormComment currentUser={currentUser} issue={issue}/>
                            </Col>
                            <Col span={24} className="my-5">
                                <CommentList currentUser={currentUser} issue={issue}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6} className="border-2 border-teal-600 p-5">
                    <div className='flex gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium mr-2">Issue created by:</span>
                        <Text>{user?.name}</Text>
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Status:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "100%" }}
                            options={optionsStatus}
                            value={issue?.status}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Assigned:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionAssign}
                            style={{ width: "100%" }}
                            options={users?.map((user: any) => ({
                                value: user?.id,
                                label: user?.name
                            }))}
                            value={issue?.assignto}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Time setup:</span>
                        <RangePicker 
                            showTime 
                            onChange={onChange} 
                            defaultValue={
                                [dayjs(issue?.timework[0], dateFormat), dayjs(issue?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker"
                        />
                    </div>
                    <div className='flex gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium mr-2">Work execution time:</span>
                        <Text>{`${getTime.days} ngày ${getTime.hours} giờ ${getTime.minutes} phút ${getTime.seconds} giây`|| null}</Text>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default BodyIssues