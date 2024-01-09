import { optionsStatus } from '@/app/config/options';
import { daysdifference, takeDataAddStatus, takeDataOptionsUsers, takeDataStorys } from '@/app/equation';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import { DeleteOutlined, DoubleRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table, TableColumnType, Typography } from 'antd';
import axios from 'axios';
import * as _ from "lodash/fp";
import { useRouter } from 'next/navigation';
import React, {useState } from 'react';
import toast from 'react-hot-toast';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import useUser from '@/app/hooks/useUser';
import { disableDateRanges } from '@/app/equation/datetime';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props {
    project?: any;
}

function BodyStorys({
    project
}: Props) {

    const router = useRouter();
    const [form] = Form.useForm();
    const data = takeDataStorys(project);
    const OptionsUsers = takeDataOptionsUsers(project);
    const [chooseStatus, setChooseStatus] = useState('all');
    const [chooseUser, setChooseUser] = useState('all');
    const [query, setQuery] = useState('');
    const currentUser = useCurrentUser().data;
    const users = project?.users;
    const leader = project?.projectLeader[project?.projectLeader?.length - 1]
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
            item?.name?.includes(query) || item?.epic?.includes(query) ||
            (query ?? "") === "",
        ),
    )(data);

    const handleChangeOptionStatus = (data: any, story: any) => {
        if(data){
            axios.post(`/api/storys/${story?.id}`, {
                status: data,
            })
                .then(() => {
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Status story has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionAssign = (data: any, story: any) => {
        if(data){
            axios.post(`/api/storys/${story?.id}`, {
                assignto: data,
                isAssign: true,
            })
                .then(() => {
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Assigned user has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = (story: any) => {
        axios.delete(`/api/storys/${story?.id}`)
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Story has been deleted!')
            });
    }

    const onChange = (date: any, story: any) => {
        axios.post(`/api/storys/${story?.id}`, {
            timework: date,
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time has been updated!')
            });
    };

    const handleGoToStory = (ev: any, story: any) => {
        ev.preventDefault();
        return router.push(`/storys/${story?.id}`)
    };

    const takenewStatus = takeDataAddStatus(project?.addStatus)?.listStory;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const configdate = {
        endDate: new Date(project?.timework[1]),
        startDate:new Date(project?.timework[0]),
    }
    
    const columns: TableColumnType<any>[] = [
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
            width: '25%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Epic ID',
            dataIndex: 'epicId',
            key: 'epicId',
            width: '18%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.epicId}</Text>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionStatus(e, record)}}
                        options={[
                            ...optionsStatus,
                            ...mapNewStatus
                        ]}
                        disabled= {checkuser(record?.assignto)}
                        value={record?.status}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignto',
            key: 'assignto',
            width: '10%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionAssign(e, record)}}
                        options={users?.map((user: any) => ({
                            value: user?.id,
                            label: user?.name
                        }))}
                        disabled= {checkuser(record?.assignto)}
                        value={record?.assignto}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Estimed time',
            dataIndex: 'timework',
            key: 'timework',
            width: '25%',
            render: (_: any, record: any) => {

                const getTime = daysdifference(record?.timework[0],record?.timework[1])
                
                return (
                    <div className="w-full">
                        {record?.timework && <RangePicker
                            showTime 
                            onChange={(e) => onChange(e, record)} 
                            defaultValue={
                                [dayjs(record?.timework[0], dateFormat), dayjs(record?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker"
                            disabled= {checkuser(record?.assignto)}
                            disabledDate={disableDateRanges(configdate)}
                        />}
                        <div className="flex items-center flex-start gap-x-2">
                            <Text>Time:</Text>
                            <Text>{`${getTime.days} ngày ${getTime.hours} giờ ${getTime.minutes} phút ${getTime.seconds} giây`|| null}</Text>
                        </div>
                    </div>
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
                                title="Delete the story"
                                description="Are you sure to delete this story?"
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
                            className='cursor-pointer text-xl' 
                            style={{color:'green'}}
                            onClick={(e) => handleGoToStory(e, record)}
                        />
                    </div>
                )
            },
        },
    ];


    return (
        <div className='w-full h-full'>
            <Form
                form={form}
                layout={'vertical'}
                initialValues={{
                    status: "all",
                    user: "all",
                }}
            >
                <Row justify={'space-between'} className='my-5'>
                    <Col span={8}>
                        <Title level={5}>Search</Title>
                        <Input 
                            placeholder="Name, epic..." 
                            onChange={(e) => handleChangeSearch(e.target.value)}
                            suffix={
                            <SearchOutlined
                                title="Search"
                            />
                            }
                        />
                    </Col>
                    <Col span={5}>
                        <Form.Item label="Status" name={"status"}>
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
                    <Col span={5}>
                        <Form.Item label="Assigned" name={"user"}>
                            <Select
                                onChange={(e) => setChooseUser(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    }
                                    ,...OptionsUsers
                                ]}
                                value={chooseUser}
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

export default BodyStorys