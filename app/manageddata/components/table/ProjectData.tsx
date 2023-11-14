"use client"

import { Input, Popconfirm, Table, TableColumnType, Typography } from "antd";
import { configDataProjects } from "../configdata";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import * as _ from "lodash/fp";
import { useState } from "react";

interface Props{
    projects?: any;
}

const {Title, Text} = Typography;

function ProjectData({
    projects
}:Props) {

    const dataconfig = configDataProjects(projects);
    const [query, setQuery] = useState('');

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_pj?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_pj',
            key: 'name_pj',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By',
            dataIndex: 'createdByWho',
            key: 'createdByWho',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Members',
            dataIndex: 'users',
            key: 'users',
            render: (_: any, record: any) => {
                return (
                    <div>
                        {record?.users?.map((user: any) =>(
                            <Text className='line-clamp-1'>{user?.name}</Text>
                        ))}
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
                                title="Delete the project"
                                description="Are you sure to delete this project?"
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
            <Title level={5}>1. Projects</Title>
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

export default ProjectData