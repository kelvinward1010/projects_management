"use client"
import { optionsStatus } from "@/app/config/options";
import { Col, DatePicker, Flex, Modal, Row, Select, Typography } from "antd";
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
import useEpic from "@/app/hooks/useEpic";
import BodyModalEditStory from "./BodyModalEditStory";
import ItemInListStory from "./ItemInListStory";
import { DoubleRightOutlined } from "@ant-design/icons";
import useNotifications from "@/app/hooks/useNotifications";
import { disableDateRanges } from "@/app/equation/datetime";
import useStory from "@/app/hooks/useStory";


const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props {
    story?: any;
    currentUser?: any;
}

function BodyStory({
    story,
    currentUser
}:Props) {

    const router = useRouter();
    const {data: dataEpic, mutate: mutateEpic } = useEpic(story?.epicId as string);
    const [isModalOpenEditStory, setIsModalOpenEditStory] = useState(false);
    const {data: dataProject} = useProject(dataEpic?.projectId);
    const {data: user} = useUser(story?.userId);
    const {mutate: mutateNoti} = useNotifications()
    const users = dataProject?.users;
    const leader = dataProject?.projectLeader[dataProject?.projectLeader?.length -1]
    const userLeader = useUser(leader)?.data;
    const { mutate: mutateStory } = useStory(story?.id)

    const checkuser = () => {
        return story?.assignto == currentUser?.id || userLeader?.id == currentUser?.id ? false : true
    }
    
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
            title: story?.title,
            status: story?.status,
            desc: story?.desc,
            image: story?.image,
            assignto: story?.assignto,
            timework: story?.timework,
        }
    });

    const handleChangeOptionStatus = (data: any) => {
        setValue('status', data)

        axios.post(`/api/storys/${story?.id}`, {
            status: data,
        })
            .then(() => {
                mutateEpic()
                mutateStory()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Status story has been updated!')
            });
    }

    const handleChangeOptionAssign = (data: any) => {
        setValue('assignto', data)

        axios.post(`/api/storys/${story?.id}`, {
            assignto: data,
        })
            .then(() => {
                mutateEpic()
                mutateNoti();
                mutateStory();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Assigned user has been updated!')
            });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post(`/api/storys/${story?.id}`, {
            ...data,
        })
            .then(() => {
                mutateEpic();
                mutateStory();
                setIsModalOpenEditStory(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Story has been updated!')
            });
    }

    const onChange = (date: any, dateString: any) => {
        setValue('timework', date)

        axios.post(`/api/storys/${story?.id}`, {
            timework: date,
        })
            .then(() => {
                mutateEpic();
                mutateStory();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time has been updated!')
            });
    };

    const getTime = daysdifference(story?.timework[0],story?.timework[1])

    const handleGoToInternalProblems = () => {
        return router.push(`/internalproblems/${story?.id}`)
    };

    const configdate = {
        endDate: new Date(dataProject?.timework[1]),
        startDate:new Date(dataProject?.timework[0]),
    }

    return (
        <>
            <Row className="p-5 h-fit w-full" justify={'space-between'}>
                <Col span={14}>
                    <div style={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                            paddingTop: "10px",
                            background: "white",
                        }}>
                        <Row className="my-3" justify={'space-between'}>
                            <Col className="ml-4" span={14}>
                                <Title level={3}>Description Story:</Title>
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
                                    onClick={()=>setIsModalOpenEditStory(true)}
                                >
                                    <AiFillEdit /> Edit
                                </button>
                                <Modal 
                                    title="Story Epic" 
                                    open={isModalOpenEditStory} 
                                    onCancel={() => setIsModalOpenEditStory(false)}
                                    className="modal-edit"
                                    width={1200}
                                >
                                    <BodyModalEditStory
                                        onSubmit={onSubmit}
                                        story={story}
                                    />
                                </Modal>
                            </Col>
                        </Row>
                        <div 
                            className="h-fit gap-2 p-10 w-full flex flex-col items-center-justify-center"
                        >
                            {story?.image && <Image
                                width="400"
                                height="200"
                                className="rounded m-auto"
                                src={story?.image}
                                alt="Avatar"
                            />}
                            <Text className="
                                text-xl
                                px-5
                            ">
                                {story?.desc}
                            </Text>
                            {/* <div dangerouslySetInnerHTML={{ __html: story?.desc }} className="text-lg"/> */}
                        </div>
                        <Row>
                            <Col span={24} className="border border-y-teal-600 p-10">
                                <FormComment currentUser={currentUser} story={story}/>
                            </Col>
                            <Col span={24} className="my-5">
                                <CommentList currentUser={currentUser} story={story}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={9} className="border border-teal-600 p-5">
                    <div className='flex gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium mr-2">Story created by:</span>
                        <Text>{user?.name}</Text>
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Status:</span>
                        <Select
                            disabled={checkuser()}
                            onChange={handleChangeOptionStatus}
                            style={{ width: "100%" }}
                            options={optionsStatus}
                            value={story?.status}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Assigned:</span>
                        <Select
                            disabled={checkuser()}
                            onChange={handleChangeOptionAssign}
                            style={{ width: "100%" }}
                            options={users?.map((user: any) => ({
                                value: user?.id,
                                label: user?.name
                            }))}
                            value={story?.assignto}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium">Estimated time for work to be completed:</span>
                        {story?.timework && <RangePicker 
                            showTime 
                            onChange={onChange} 
                            defaultValue={
                                [dayjs(story?.timework[0], dateFormat), dayjs(story?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker"
                            disabled={checkuser()}
                            disabledDate={disableDateRanges(configdate)}
                        />}
                    </div>
                    <div className='flex gap-y-2 justify-start mb-2'>
                        <span className="text-md font-medium mr-2">Work execution time:</span>
                        <Text>{`${getTime.days} ngày ${getTime.hours} giờ ${getTime.minutes} phút ${getTime.seconds} giây`|| null}</Text>
                    </div>
                    <Flex vertical className="mt-5 border-2 border-teal-600 rounded">
                        <div className="w-full h-[40px] rounded bg-teal-600 flex justify-center items-center text-white">
                            <Text 
                                className="text-white text-lg cursor-pointer"
                                onClick={handleGoToInternalProblems}
                            >
                                Internal Problems
                                <DoubleRightOutlined
                                    className="text-lg ml-2"
                                />
                            </Text>
                        </div>
                        <div className="w-full h-[400px] mt-2 p-2 overflow-y-auto">
                            {story?.tasks?.length != 0 && story?.tasks?.map((task: any) => (
                                <ItemInListStory
                                    task={task}
                                    key={task?.id}
                                />
                            ))}
                            {story?.tasks?.length == 0 && <div className="text-center">
                                Don't have any Internal Problems
                            </div>}
                        </div>
                    </Flex>
                </Col>
            </Row>
        </>
    )
}

export default BodyStory