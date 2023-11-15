"use client"

import { Avatar, Input, Popconfirm, Table, TableColumnType, Typography } from "antd";
import { useRouter } from "next/navigation";
import { configDataUsers } from "../configdata";
import { useState } from "react";
import useUsers from "@/app/hooks/useUsers";
import * as _ from "lodash/fp";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import BodyEditUser from "../modal/BodyEditUser";
import axios from "axios";
import toast from "react-hot-toast";
import CreateUser from "../modal/CreateUser";

interface Props{
    users?: any;
}

const {Title, Text} = Typography;

function UserData({
    users
}:Props) {

    const router = useRouter();
    const dataconfig = configDataUsers(users);
    const [query, setQuery] = useState('');
    const {mutate: mutateUser} = useUsers();

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name?.includes(query) ||
            item?.name_id?.includes(query) ||
            item?.id?.includes(query) ||
            item?.email?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const handleDelete = (user: any) => {

        axios.delete(`/api/users/${user?.id}`)
            .then(() => {
                mutateUser();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('User has been deleted!')
            })
    };

    const columns: TableColumnType<any>[] = [
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Name ID',
            dataIndex: 'name_id',
            key: 'name_id',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, record: any) => {
                return (
                    <div>
                        <Avatar src={record?.image || record?.profileImage || '/images/placeholder.jpg'} />
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
                        <div>
                            <Popconfirm
                                title="Delete the user"
                                description="Are you sure to delete this user?"
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
                        <div>
                            <BodyEditUser user={record} />
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="w-full h-fit mt-5">
            <div className="w-full flex justify-between items-center">
                <div className="ml-5 w-[400px] my-2 bg-teal-600 text-white p-2 rounded">
                    <Text className="text-white">Search</Text>
                    <Input
                        placeholder="Name, Id, name Id, email..." 
                        onChange={(e) => setQuery(e.target.value)}
                        suffix={
                        <SearchOutlined
                            title="Search"
                        />
                        }
                    />
                </div>
                <CreateUser />
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={dataSelect ?? []}
                pagination={{
                    pageSize: 10,
                }}
                className="mx-5"
            />
        </div>
    )
}

export default UserData