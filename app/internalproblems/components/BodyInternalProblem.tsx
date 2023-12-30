"use client"
import { daysdifference, takeDataAddStatus, takeDataInternalProblem, takeDataOptionsUsers, totalWorkTime, totalWorkTimeForFinish } from "@/app/equation";
import useProject from "@/app/hooks/useProject";
import { Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, TableColumnType, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as _ from "lodash/fp";
import { DeleteOutlined, DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { optionsStatus, optionsTypes } from "@/app/config/options";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillBug, AiFillLeftSquare } from "react-icons/ai";
import useNotifications from "@/app/hooks/useNotifications";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
import useUser from "@/app/hooks/useUser";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useStory from "@/app/hooks/useStory";

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props{
    story?: any;
}

function BodyInternalProblem({
    story
}:Props) {

    const router = useRouter();
    const [form] = Form.useForm();
    const data = takeDataInternalProblem(story?.tasks);
    const {data: dataProject} = useProject(story?.projectId);
    const OptionsUsers = takeDataOptionsUsers(dataProject);
    const [query, setQuery] = useState('');
    const [chooseStatus, setChooseStatus] = useState('all');
    const [chooseUser, setChooseUser] = useState('all');
    const [chooseType, setChooseType] = useState('all');
    const users = dataProject?.users;
    const {mutate: mutateNoti} = useNotifications();
    const { mutate: mutateStory } = useStory(story?.id);
    const currentUser = useCurrentUser()?.data
    const leader = dataProject?.projectLeader[dataProject?.projectLeader -1]
    const userLeader = useUser(leader)?.data;
    
    const checkuser = (keycheck: any) => {
        return keycheck == currentUser?.id || userLeader?.id == currentUser?.id ? false : true
    }

    const handleChangeSearch = (e: any) => {
        setQuery(e);
    };

    const dataSelect = _.flow(
        _.filter(
        (item: any) =>
            item.assignto === chooseUser || chooseUser === 'all'
        ),
        _.filter(
        (item: any) =>
            item.status === chooseStatus || chooseStatus === 'all'
        ),
        _.filter(
            (item: any) =>
                item.type === chooseType || chooseType === 'all'
            ),
        _.filter(
          (item: any) =>
            item?.name?.includes(query) || item?.desc?.includes(query) ||
            (query ?? "") === "",
        ),
    )(data);

    const handleChangeOptionAssign = (data: any, internals: any) => {

        if(data){
            axios.post(`/api/tasks/${internals?.id}`, {
                assignto: data,
                isAssign: true,
            })
                .then(() => {
                    router.refresh();
                    mutateStory()
                    mutateNoti();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Assigned user has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionStatus = (data: any, internals: any) => {
        const currentDate = new Date();
        
        if(data !== 'Done'){
            axios.post(`/api/tasks/${internals?.id}`, {
                status: data,
                completionTime: '',
            })
                .then(() => {
                    router.refresh();
                    mutateStory();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Status internals has been updated!')
                });
        }else if(data === 'Done'){
            axios.post(`/api/tasks/${internals?.id}`, {
                status: data,
                completionTime: currentDate,
            })
                .then(() => {
                    router.refresh();
                    mutateStory()
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Status internals has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionType = (data: any, internals: any) => {
        if(data){
            axios.post(`/api/tasks/${internals?.id}`, {
                type: data,
            })
                .then(() => {
                    router.refresh();
                    mutateStory()
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Type internals has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = (internals: any) => {

        axios.delete(`/api/tasks/${internals?.id}`)
            .then(() => {
                router.refresh();
                mutateStory()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Internals has been deleted!')
            });
    }

    const onChange = (date: any, internals: any) => {
        axios.post(`/api/tasks/${internals?.id}`, {
            timework: date,
        })
            .then(() => {
                router.refresh();
                mutateStory()
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time has been updated!')
            });
    };

    const handleGoToInTask = (task: any) => {
        return router.push(`/tasks/${task?.id}`)
    };

    const takenewStatus = takeDataAddStatus(dataProject?.addStatus)?.listInternal;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const timeWork = totalWorkTime(data);

    const timeforFinished = () => totalWorkTimeForFinish(data);
    setTimeout(timeforFinished, 300000);

    const columns: TableColumnType<any>[] = [
        {
            title: 'Icon',
            width: '4%',
            render: (_: any, record: any) => {
                const iconType = record?.type === 'Bug' ? 
                    <Text className="text-xl text-red-600">
                        <AiFillBug /> 
                    </Text>
                    : 
                    <Text className="text-xl text-green-600">
                        <AiFillLeftSquare />
                    </Text>
                return iconType
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignto',
            key: 'assignto',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        disabled={checkuser(record?.assignto)}
                        onChange={(e) => {handleChangeOptionAssign(e, record)}}
                        options={users?.map((user: any) => ({
                            value: user?.id,
                            label: user?.name
                        }))}
                        value={record?.assignto}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Estimed time to completion',
            dataIndex: 'timework',
            key: 'timework',
            width: '20%',
            render: (_: any, record: any) => {

                const getTime = daysdifference(record?.timework[0],record?.timework[1])
                
                return (
                    <>
                        {record?.timework && <RangePicker 
                            showTime 
                            onChange={(e) => onChange(e, record)} 
                            defaultValue={
                                [dayjs(record?.timework[0], dateFormat), dayjs(record?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker"
                            disabled={checkuser(record?.assignto)}
                        />}
                        <div className="flex items-center flex-start gap-x-2">
                            <Text>Time:</Text>
                            <Text>{`${getTime.days} ngày ${getTime.hours} giờ ${getTime.minutes} phút ${getTime.seconds} giây`|| null}</Text>
                        </div>
                    </>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';

                return (
                    <Select
                        onChange={(e) => {handleChangeOptionStatus(e, record)}}
                        options={[
                            ...optionsStatus,
                            ...mapNewStatus
                        ]}
                        value={record?.status}
                        className='select-in-table'
                        disabled={checkuser(record?.assignto)}
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionType(e, record)}}
                        options={optionsTypes}
                        value={record?.type}
                        className='select-in-table'
                        disabled={checkuser(record?.assignto)}
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Actions',
            width: '10%',
            align:'center',
            render: (_: any, record: any) => {
                return (
                    <div className='w-full flex items-center justify-center gap-x-5'>
                        {checkuser(record?.assignto) == false ? <div>
                            <Popconfirm
                                title="Delete the internal"
                                description="Are you sure to delete this internal?"
                                onConfirm={() => handleDelete(record)}
                                okText="Yes"
                                cancelText="No"
                                className='popconfirm'
                            >
                                <DeleteOutlined 
                                    className='cursor-pointer text-xl' 
                                    style={{color:'red'}}
                                />
                            </Popconfirm>
                        </div>: null}
                        <DoubleRightOutlined
                            className="cursor-pointer text-teal-600"
                            onClick={() => handleGoToInTask(record)}
                        />
                    </div>
                )
            },
        },
    ]
    
    return (
        <div className="w-full h-full px-10 mt-5">
            <div>
                <Title level={5}>1. Total expected completion time.</Title>
                <div className='ml-5 py-2 px-5 bg-white rounded w-fit'>
                    <Text>
                        {`${timeWork.days} days ${timeWork.hours} hours ${timeWork.minutes} minutes ${timeWork.seconds} seconds `}
                    </Text>
                </div>
            </div>
            <div className="my-2">
                <Title level={5}>2. Actual time for completed tasks.</Title>
                <div className='ml-5 py-2 px-5 bg-white rounded w-fit'>
                    <Text>
                        {`${-timeforFinished().days} days ${timeforFinished().hours} hours ${timeforFinished().minutes} minutes ${timeforFinished().seconds} seconds `}
                    </Text>
                </div>
            </div>
            <Title level={5}>3. Internal problems.</Title>
            <Form
                form={form}
                layout={'vertical'}
                initialValues={{
                    status: "all",
                    user: "all",
                    type: "all"
                }}
                className="bg-teal-600 text-white px-2 rounded"
            >
                <Row justify={'space-between'} className='my-5'>
                    <Col span={8}>
                        <Title level={5} className="text-internal">Search</Title>
                        <Input 
                            placeholder="Name, desc..." 
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            suffix={
                            <SearchOutlined
                                title="Search"
                            />
                            }
                        />
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Status" name={"status"} className="text-internal"> 
                            <Select
                                onChange={(e) => setChooseStatus(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    }
                                    ,...optionsStatus,
                                    ...mapNewStatus
                                ]}
                                value={chooseStatus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Assigned" name={"user"} className="text-internal">
                            {OptionsUsers && <Select
                                onChange={(e) => setChooseUser(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    },...OptionsUsers
                                ]}
                                value={chooseUser}
                            />}
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Types" name={"type"} className="text-internal"> 
                            <Select
                                onChange={(e) => setChooseType(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    }
                                    ,...optionsTypes
                                ]}
                                value={chooseType}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                bordered
                columns={columns}
                dataSource={dataSelect ?? []}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default BodyInternalProblem