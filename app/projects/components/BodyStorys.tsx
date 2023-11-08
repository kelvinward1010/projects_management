import { optionsStatus } from '@/app/config/options';
import { takeDataOptionsUsers, takeDataStorys } from '@/app/equation';
import useNotifications from '@/app/hooks/useNotifications';
import { DeleteOutlined, DoubleRightOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Popconfirm, Row, Select, Table, TableColumnType, Typography } from 'antd';
import axios from 'axios';
import * as _ from "lodash/fp";
import { useRouter } from 'next/navigation';
import React, {useState } from 'react';
import toast from 'react-hot-toast';

const { Text, Title } = Typography;

interface Props {
    project?: any;
}

function BodyStorys({
    project
}: Props) {

    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const data = takeDataStorys(project);
    const OptionsUsers = takeDataOptionsUsers(project);
    const [chooseStatus, setChooseStatus] = useState('all');
    const [chooseUser, setChooseUser] = useState('all');
    const [query, setQuery] = useState('');
    const {mutate: mutateNoti} = useNotifications()?.data;

    const users = project?.users

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
        setIsLoading(true);
        console.log(data)
        if(data){
            axios.post(`/api/storys/${story?.id}`, {
                status: data,
            })
                .then(() => {
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    setIsLoading(false);
                    toast.success('Status issue has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionAssign = (data: any, story: any) => {
        setIsLoading(true);

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
                    setIsLoading(false);
                    toast.success('Assigned user has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = (story: any) => {
        setIsLoading(true);

        axios.delete(`/api/storys/${story?.id}`)
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Story has been deleted!')
            });
    }

    const handleGoToStory = (ev: any, story: any) => {
        ev.preventDefault();
        return router.push(`/storys/${story?.id}`)
    };
    
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
            width: '30%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Epic ID',
            dataIndex: 'Epic',
            key: 'Epic',
            width: '18%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.epic}</Text>
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
            title: 'Actions',
            width: '10%',
            align:'center',
            render: (_: any, record: any) => {
                return (
                    <div className='w-full flex items-center justify-center gap-x-5'>
                        <div>
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
                        </div>
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
                                    ,...optionsStatus
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
                                value={chooseStatus}
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