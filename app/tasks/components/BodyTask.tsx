"use client"
import { optionsStatus, optionsTypes } from "@/app/config/options";
import { Col, DatePicker, Modal, Row, Select, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import FormComment from "./FormComment";
import CommentList from "./CommentList";
import useProject from "@/app/hooks/useProject";
import useUser from "@/app/hooks/useUser";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { daysdifference } from "@/app/equation";
import BodyModalEditTask from "./BodyModalEditTask";


const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props {
    task?: any;
    currentUser?: any;
}

function BodyTask({
    task,
    currentUser
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenEditTask, setIsModalOpenEditTask] = useState(false);
    const {data: dataProject} = useProject(task?.projectId);
    const {data: user} = useUser(task?.userId);

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
            title: task?.title,
            status: task?.status,
            desc: task?.desc,
            image: task?.image,
            assignto: task?.assignto,
            timework: task?.timework,
            type: task?.type,
        }
    });

    const handleChangeOptionType = (data: any) => {
        setIsLoading(true);
        setValue('type', data)

        axios.post(`/api/tasks/${task?.id}`, {
            type: data,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Type task has been updated!')
            });
    }

    const handleChangeOptionStatus = (data: any) => {
        setIsLoading(true);
        setValue('status', data)

        axios.post(`/api/tasks/${task?.id}`, {
            status: data,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Status task has been updated!')
            });
    }

    const handleChangeOptionAssign = (data: any) => {
        setIsLoading(true);
        setValue('assignto', data)

        axios.post(`/api/tasks/${task?.id}`, {
            assignto: data,
        })
            .then(() => {
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

        axios.post(`/api/tasks/${task?.id}`, {
            ...data,
        })
            .then(() => {
                router.refresh();
                setIsModalOpenEditTask(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Story has been updated!')
            });
    }

    const onChange = (date: any, dateString: any) => {

        setIsLoading(true);
        setValue('timework', date)

        axios.post(`/api/tasks/${task?.id}`, {
            timework: date,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Time has been updated!')
            });
    };

    const getTime = daysdifference(task?.timework[0],task?.timework[1])

    return (
        <>
            <Row className="p-5 h-fit w-full" justify={'space-between'}>
                <Col span={16} className="border-2 border-teal-600">
                    <div>
                        <Row className="my-3" justify={'space-between'}>
                            <Col className="ml-4" span={14}>
                                <Title level={3}>Description Task:</Title>
                            </Col>
                            <Col span={3}>
                                <button 
                                    className='
                                        w-4/5
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
                                    onClick={()=>setIsModalOpenEditTask(true)}
                                >
                                    <AiFillEdit /> Edit
                                </button>
                                <Modal 
                                    title="Task in story" 
                                    open={isModalOpenEditTask} 
                                    onCancel={() => setIsModalOpenEditTask(false)}
                                    className="modal-edit"
                                    width={1200}
                                >
                                    <BodyModalEditTask
                                        isOpen={isModalOpenEditTask}
                                        onSubmit={onSubmit}
                                        task={task}
                                    />
                                </Modal>
                            </Col>
                        </Row>
                        <div className="h-fit gap-2 p-10 w-full flex flex-col items-center-justify-center">
                            {task?.image && <Image
                                width="400"
                                height="200"
                                className="rounded m-auto"
                                src={task?.image}
                                alt="Avatar"
                            />}
                            <Text className="
                                text-xl
                                px-5
                            ">
                                {task?.desc}
                            </Text>
                        </div>
                        <Row>
                            <Col span={24} className="border-2 border-t-teal-600 p-10">
                                <FormComment currentUser={currentUser} task={task}/>
                            </Col>
                            <Col span={24} className="my-5">
                                <CommentList currentUser={currentUser} task={task}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6} className="border-2 border-teal-600 p-5">
                    <div className='flex gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium mr-2">Story created by:</span>
                        <Text>{user?.name}</Text>
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Type:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionType}
                            style={{ width: "100%" }}
                            options={optionsTypes}
                            value={task?.type}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Status:</span>
                        <Select
                            disabled={isLoading}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "100%" }}
                            options={optionsStatus}
                            value={task?.status}
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
                            value={task?.assignto}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Estimated time for work to be completed:</span>
                        <RangePicker 
                            showTime 
                            onChange={onChange} 
                            defaultValue={
                                [dayjs(task?.timework[0], dateFormat), dayjs(task?.timework[1], dateFormat)]
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

export default BodyTask