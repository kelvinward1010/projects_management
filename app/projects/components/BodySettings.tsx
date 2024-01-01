"use client"

import { Col, DatePicker, Modal, Row, Select, Typography } from "antd";
import { useState } from "react";
import FormSettingStatus from "./input/FormSettingStatus";
import { takeDataAddStatus } from "@/app/equation";
import TableSetting from "./table/TableSetting";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputSettings from "./input/InputSettings";
import { CheckOutlined } from "@ant-design/icons";
import useUser from "@/app/hooks/useUser";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { optionsStatusProject } from "@/app/config/options";
import useProject from "@/app/hooks/useProject";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

interface Props {
    project?: any;
}

function BodySettings({
    project
}:Props) {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEpics, setIsOpenEpics] = useState(false);
    const [isOpenInternals, setIsOpenInternals] = useState(false);
    const [isOpenStorys, setIsOpenStorys] = useState(false);
    const [leaderAdd, setLeaderAdd] = useState('');
    const [statusProject, setStatusProject] = useState('');
    const dataForEach = takeDataAddStatus(project?.addStatus);
    const users = project?.users;
    const leader = project?.projectLeader[project?.projectLeader?.length -1]
    const userLeader = useUser(leader)?.data;
    const {mutate: mutateProject} = useProject(project?.id)

    const {
        register,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: project?.title,
            timework: project?.timework,
            status: project?.status,
        }
    });

    const title = watch("title");
    const timework = watch('timework');

    const handleOptionLeader = (e: any) => {
        setLeaderAdd(e)
    }

    const handleOptionStatus = (e: any) => {
        setStatusProject(e)
    }

    const handleChangeTitleProject = () => {
        axios.post(`/api/projects/${project?.id}`, {
            title: title,
        })
            .then(() => {
                router.refresh();
                mutateProject();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Title project has been updated!')
            });
    }

    const handleChangeLeaderProject = () => {
        axios.post(`/api/projects/${project?.id}`, {
            isChangeLeader: true,
            leaderAdd: leaderAdd,
        })
            .then(() => {
                location.reload();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('The project leader has been updated!')
            });
    }

    const handleChangeTimeProject = () => {
        axios.post(`/api/projects/${project?.id}`, {
            timework: timework,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time project has been updated!')
            });
    }

    const handleChangeStatusProject = () => {
        axios.post(`/api/projects/${project?.id}`, {
            status: statusProject
        })
            .then(() => {
                router.refresh();
                mutateProject();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('The project status has been updated!')
            });
    }

    return (
        <>
            <Modal
                title="Add status"
                open={isOpen} 
                onCancel={() => setIsOpen(false)}
                className="modal-edit"
                width={700}
            >
                <FormSettingStatus
                    isEpics={isOpenEpics}
                    isInternals={isOpenInternals}
                    isStorys={isOpenStorys}
                    projectId={project?.id}
                    onClose={() => setIsOpen(false)}
                />
            </Modal>
            <div className="w-full h-full mt-5">
                <Title level={5}>1. Leader Project: {userLeader?.name}</Title>
                <Row justify={'start'} className="items-center">
                    <Col span={13}>
                        <Select
                            placeholder="Select a person to change leader project"
                            onChange={(e) => handleOptionLeader(e)}
                            options={users?.map((user: any) => ({
                                value: user?.id,
                                label: user?.name
                            }))}
                            className='rounded select-in-table border-2 border-sky-600 w-full'
                        />
                    </Col>
                    <Col span={5}>
                        <button
                            className="
                                w-16
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                                ml-5
                            "
                            onClick={handleChangeLeaderProject}
                        >
                            <CheckOutlined />
                        </button>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-full mt-5">
                <Title level={5}>2. Setting title project</Title>
                <Row justify={'start'} className="items-center">
                    <Col span={13}>
                        <InputSettings
                            id="title"
                            errors={errors}
                            required
                            register={register}
                        />
                    </Col>
                    <Col span={5}>
                        <button
                            className="
                                w-16
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                                ml-5
                                mt-2
                            "
                            onClick={handleChangeTitleProject}
                        >
                            <CheckOutlined />
                        </button>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-full mt-5">
                <Title level={5}>3. Setting time project</Title>
                <Row justify={'start'} className="items-center">
                    <Col span={13}>
                        {project?.timework && <RangePicker 
                            showTime 
                            onChange={(value) => setValue('timework', value)}
                            defaultValue={
                                [dayjs(project?.timework[0], dateFormat), dayjs(project?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker w-full"
                        />}
                    </Col>
                    <Col span={5}>
                        <button
                            className="
                                w-16
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                                ml-5
                                mt-2
                            "
                            onClick={handleChangeTimeProject}
                        >
                            <CheckOutlined />
                        </button>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-full mt-5">
                <Title level={5}>4. Status Project: {project?.status}</Title>
                <Row justify={'start'} className="items-center">
                    <Col span={13}>
                        <Select
                            placeholder="Select status to change status project"
                            options={optionsStatusProject}
                            className='rounded select-in-table border-2 border-sky-600 w-full'
                            onChange={(e) =>handleOptionStatus(e)}
                        />
                    </Col>
                    <Col span={5}>
                        <button
                            className="
                                w-16
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                                ml-5
                            "
                            onClick={handleChangeStatusProject}
                        >
                            <CheckOutlined />
                        </button>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-full mt-5">
                <Title level={5}>5. Setting status in project</Title>
                <div className="ml-10 w-full">
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>1. Epics</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenEpics(true);
                                        setIsOpenInternals(false);
                                        setIsOpenStorys(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                        {dataForEach?.listEpic.length >=1 ? <TableSetting data={dataForEach?.listEpic} /> : null}
                    </div>
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>2. Storys</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenStorys(true);
                                        setIsOpenInternals(false);
                                        setIsOpenEpics(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                       {dataForEach?.listStory.length >=1 ? <TableSetting data={dataForEach?.listStory} /> : null}
                    </div>
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>3. Internals</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenInternals(true);
                                        setIsOpenEpics(false);
                                        setIsOpenStorys(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                        {dataForEach?.listInternal.length >=1 ? <TableSetting data={dataForEach?.listInternal} /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BodySettings