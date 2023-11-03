"use client"
import { takeMapDataMembers, takeDataMemberOthers } from "@/app/equation";
import { DeleteOutlined, DoubleRightOutlined, SearchOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Col, Flex, Form, Input, Popconfirm, Row, Select, Table, TableColumnType, Typography } from "antd"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import _ from "lodash";
import useUsers from "@/app/hooks/useUsers";

const { Title, Text } = Typography;

interface Props{
    project?: any;
}

function BodyMembers({
    project
}:Props) {

    const [form] = Form.useForm();
    const router = useRouter();
    const members = takeMapDataMembers(project);
    const [query, setQuery] = useState('');
    const users: any = useUsers()?.data
    const projectUsers: any = project?.users

    const dataOptionsUsers = _.differenceBy(users, projectUsers, 'id');

    const handleChangeSearch = (e: any) => {
        setQuery(e);
    };

    const dataSearch = _.flow(
        _.filter(
          (item: any) =>
            item?.name?.includes(query) || item?.email?.includes(query) ||
            (query ?? "") === "",
        ),
    )(members);

    const handleUpdateUserKickOut = (data: any) => {
        if(project?.users?.length <= 2) {
            return;
        }
        if(data){
            axios.post(`/api/projects/${project?.id}`, {
                userId: data?.id,
                kickout: true,
            })
                .then(() => {
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('User has been kickouted!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const columns: TableColumnType<any>[] = [
        {
            title: 'STT',
            width: '5%',
            align: 'center',
            render: (_, __, index) => (
                <Typography.Text style={{ textAlign: "center" }}>
                  {++index}
                </Typography.Text>
            ),
        },
        {
            title: 'Avatar',
            dataIndex: 'avt',
            key: 'avt',
            width: '5%',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <div className="flex items-center justify-center">
                        <Image 
                            src={record?.avt || '/images/placeholder.jpg'}
                            width={50}
                            height={50}
                            style={{
                                objectFit: 'cover',
                                borderRadius: '100%'
                            }}
                            alt="avt"
                        />
                    </div>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Name ID',
            dataIndex: 'name_Id',
            key: 'name_Id',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '18%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.email}</Text>
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
                                title="Kick this member out of project"
                                description="Are you sure to kick this member?"
                                onConfirm={() => handleUpdateUserKickOut(record)}
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
                            onClick={() => {}}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className="w-full h-full">
            <Form
                form={form}
                layout={'vertical'}
            >
                <Row justify={'space-between'} className='my-5 items-center'>
                    <Col span={8}>
                        <Form.Item label="Add Project" name={"status"}>
                            <Input 
                                placeholder="Name, email..." 
                                onChange={(e) => handleChangeSearch(e.target.value)}
                                suffix={
                                    <SearchOutlined
                                        title="Search"
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item label="Add members" name={"status"}>
                            <Flex className="gap-x-2" align="center" justify="center">
                                <Select
                                    onChange={(e) => {}}
                                    style={{ width: "100%" }}
                                    mode={'multiple'}
                                    options={dataOptionsUsers?.map((user: any) => ({
                                        value: user?.id,
                                        label: user?.name
                                    }))}
                                />
                                <UsergroupAddOutlined className="text-xl text-teal-600 cursor-pointer"/>
                            </Flex>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                bordered
                columns={columns}
                dataSource={dataSearch ?? []}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default BodyMembers