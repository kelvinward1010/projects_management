"use client"
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Col, Flex, Form, Input, Modal, Popconfirm, Row, Select, Table, TableColumnType, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { takeDataMemberOthers, takeDataStorys, takeMapDataMembers } from '@/app/equation';
import useUsers from '@/app/hooks/useUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as _ from "lodash/fp";
import { CheckOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import InputEdit from '../input/InputEdit';
import useManageddata from '@/app/hooks/useMannageddata';

interface Props {
    project?: any;
}

const { Text, Title } = Typography;

function BodyEditProject({
    project,
}:Props) {

    const [form] = Form.useForm();
    const router = useRouter();
    const members = takeMapDataMembers(project);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [query, setQuery] = useState('');
    const users: any = useUsers()?.data;
    const projectUsers: any = project?.users;
    const dataOptionsUsers = takeDataMemberOthers(projectUsers, users);
    const dataStorys = takeDataStorys(project);
    const {mutate: mutateAll} = useManageddata();

    const dataSearch = _.flow(
        _.filter(
          (item: any) =>
            item?.name?.includes(query) || item?.email?.includes(query) ||
            (query ?? "") === "",
        ),
    )(members);

    const {
        register,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            membersAdd: [],
            title: project?.name_pj,
        }
    });

    const membersAdd = watch('membersAdd');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        if(membersAdd.length >= 1) {
            axios.post(`/api/projects/${project?.id}`, {
                isAdd : true,
                membersAdd: membersAdd
            })
                .then(() => {
                    router.refresh();
                    reset();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('User has been added!')
                });
        }else{
            toast.success('You need to choose at least one person!')
        }
    }
    

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
                dataStorys?.forEach((story) => {
                    if(story?.assignto === data?.id){
                        axios.post(`/api/storys/${story?.id}`, {
                            assignto: '',
                        })
                    }else{
                        return;
                    }
                })
        }else{
            toast.error('Something went wrong!')
        }
    }

    const title = watch("title")

    const handleChangeTitleProject = () => {
        axios.post(`/api/projects/${project?.id}`, {
            title: title,
        })
            .then(() => {
                mutateAll()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Title has been updated!')
            });
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
                )
            },
        },
    ]

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="Project Edit" 
                open={isModalOpenEdit} 
                onCancel={() =>setIsModalOpenEdit(false)}
                className="modal-edit"
                width={1200}
            >
                <div className="w-full h-full">
                    <Row justify={'start'} className="items-center">
                        <Col span={13}>
                            <InputEdit
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
                                    p-5
                                "
                                onClick={handleChangeTitleProject}
                            >
                                <CheckOutlined />
                            </button>
                        </Col>
                    </Row>
                    <Form
                        form={form}
                        layout={'vertical'}
                    >
                        <Row justify={'space-between'} className='my-5 items-center'>
                            <Col span={8}>
                                <Form.Item label="Search" name={"status"}>
                                    <Input
                                        placeholder="Name, email..." 
                                        onChange={(e) => setQuery(e.target.value)}
                                        suffix={
                                            <SearchOutlined
                                                title="Search"
                                            />
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Flex className="gap-x-2" align="center" justify="center">
                                    <Select
                                        onChange={(value) => setValue('membersAdd', value, {
                                            shouldValidate: true
                                        })}
                                        style={{ width: "100%" }}
                                        mode={'multiple'}
                                        options={dataOptionsUsers?.map((user: any) => ({
                                            value: user?.id,
                                            label: user?.name
                                        }))}
                                        value={membersAdd}
                                    />
                                    <UsergroupAddOutlined
                                        className="text-xl text-teal-600 cursor-pointer"
                                        onClick={onSubmit}
                                    />
                                </Flex>
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
            </Modal>
        </>
    )
}

export default BodyEditProject