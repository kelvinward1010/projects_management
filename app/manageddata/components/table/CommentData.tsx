"use client"

import { Input, Popconfirm, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataComments } from "../configdata";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

interface Props{
    comments?: any;
}

const {Title, Text} = Typography;

function CommentData({
    comments
}:Props) {

    const dataconfig = configDataComments(comments);
    const [query, setQuery] = useState('');

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.content_cmt?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const columns: TableColumnType<any>[] = [
        {
            title: 'Content',
            dataIndex: 'content_cmt',
            key: 'content_cmt',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By',
            dataIndex: 'userId_cmt',
            key: 'userId_cmt',
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
                                title="Delete the epic"
                                description="Are you sure to delete this epic?"
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
            <Title level={5}>6. Comments</Title>
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

export default CommentData