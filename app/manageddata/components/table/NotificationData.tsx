"use client"

import { Input, Popconfirm, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataNotifications } from "../configdata";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import useManageddata from "@/app/hooks/useMannageddata";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BodyEditNotification from "../modal/BodyEditNotification";

interface Props{
    notifications?: any;
}

const {Title, Text} = Typography;

function NotificationData({
    notifications
}:Props) {
    
    const router = useRouter();
    const dataconfig = configDataNotifications(notifications);
    const [query, setQuery] = useState('');
    const {mutate: mutateNoti} = useManageddata();

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_noti?.includes(query) || item?.descNoti?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const handleDelete = (noti: any) => {

        axios.delete(`/api/notifications/${noti?.id}`)
            .then(() => {
                mutateNoti();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Notification has been deleted!')
            })
    };

    const columns: TableColumnType<any>[] = [
        {
            title: 'Title',
            dataIndex: 'name_noti',
            key: 'name_noti',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'descNoti',
            key: 'descNoti',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By UserId',
            dataIndex: 'userId_Noti',
            key: 'userId_Noti',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
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
                                title="Delete the notification"
                                description="Are you sure to delete this notification?"
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
                            <BodyEditNotification notification={record}/>
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="w-full h-fit">
            <div className="ml-5 w-[400px] my-2 bg-teal-600 text-white p-2 rounded">
                <Text className="text-white">Search</Text>
                <Input
                    placeholder="Title, description..." 
                    onChange={(e) => setQuery(e.target.value)}
                    suffix={
                    <SearchOutlined
                        title="Search"
                    />
                    }
                />
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

export default NotificationData