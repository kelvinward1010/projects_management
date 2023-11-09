"use client"
import { takeDataInternalProblem, takeDataOptionsUsers } from "@/app/equation";
import useEpic from "@/app/hooks/useEpic";
import useProject from "@/app/hooks/useProject";
import { Col, Form, Input, Popconfirm, Row, Select, Table, TableColumnType, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as _ from "lodash/fp";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { optionsStatus, optionsTypes } from "@/app/config/options";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillBug, AiFillLeftSquare } from "react-icons/ai";

const { Text, Title } = Typography;

interface Props{
    story?: any;
}

function BodyInternalProblem({
    story
}:Props) {

    const router = useRouter();
    const [form] = Form.useForm();
    const data = takeDataInternalProblem(story?.tasks);
    const {data: dataEpic } = useEpic(story?.epicId as string);
    const {data: dataProject} = useProject(dataEpic?.projectId);
    const OptionsUsers = takeDataOptionsUsers(dataProject);
    const [query, setQuery] = useState('');
    const [chooseStatus, setChooseStatus] = useState('all');
    const [chooseUser, setChooseUser] = useState('all');
    const [chooseType, setChooseType] = useState('all');
    const users = dataProject?.users;

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
        if(data){
            axios.post(`/api/tasks/${internals?.id}`, {
                status: data,
            })
                .then(() => {
                    router.refresh();
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
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Internals has been deleted!')
            });
    }

    const columns: TableColumnType<any>[] = [
        {
            title: 'Icon Type',
            width: '7%',
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
            width: '30%',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionStatus(e, record)}}
                        options={optionsStatus}
                        value={record?.status}
                        className='select-in-table'
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
                        <div>
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
                        </div>
                    </div>
                )
            },
        },
    ]
    
    return (
        <div className="w-full h-full px-10 mt-5">
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
                                    ,...optionsStatus
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