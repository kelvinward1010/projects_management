"use client"

import { Input, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataTasks } from "../configdata";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { optionsStatus } from "@/app/config/options";

interface Props{
    tasks?: any;
}

const {Title, Text} = Typography;

function TaskData({
    tasks
}:Props) {

    const dataconfig = configDataTasks(tasks);
    const [query, setQuery] = useState('');

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_task?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_task',
            key: 'name_task',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By',
            dataIndex: 'userId_task',
            key: 'userId_task',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'status_task',
            key: 'status_task',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status_task === 'Done' ? 'green' : record?.status_task === 'Improgress' ? 'blue' : 'black';

                return (
                    <Select
                        onChange={(e) => {}}
                        options={[
                            ...optionsStatus,
                        ]}
                        value={record?.status_task}
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
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => {}}
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
        <div className="w-full h-fit mt-5">
            <Title level={5}>4. Tasks</Title>
            <div className="ml-5 w-[400px] my-2 bg-teal-600 text-white p-2 rounded">
                <Text className="text-white">Search</Text>
                <Input
                    placeholder="Name..." 
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