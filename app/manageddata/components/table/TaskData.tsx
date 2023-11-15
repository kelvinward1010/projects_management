"use client"

import { Input, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataTasks } from "../configdata";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import useManageddata from "@/app/hooks/useMannageddata";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BodyEditTask from "../modal/BodyEditTask";

interface Props{
    tasks?: any;
}

const {Title, Text} = Typography;

function TaskData({
    tasks
}:Props) {

    const router = useRouter();
    const dataconfig = configDataTasks(tasks);
    const [query, setQuery] = useState('');
    const {mutate: mutateTask} = useManageddata();

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_task?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const handleDelete = (task: any) => {

        axios.delete(`/api/tasks/${task?.id}`)
            .then(() => {
                mutateTask();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Task has been deleted!')
            })
    };

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_task',
            key: 'name_task',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'desc_task',
            key: 'desc_task',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By UserId',
            dataIndex: 'userId_task',
            key: 'userId_task',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.userId_task}</Text>
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
                                title="Delete the task"
                                description="Are you sure to delete this task?"
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
                            <BodyEditTask 
                                task={record}
                            />
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="w-full h-fit mt-5">
            <div className="ml-5 w-[400px] my-2 bg-teal-600 text-white p-2 rounded">
                <Text className="text-white">Search</Text>
                <Input
                    placeholder="Name, description..." 
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

export default TaskData