"use client"

import { Input, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataStorys } from "../configdata";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { optionsStatus } from "@/app/config/options";
import useManageddata from "@/app/hooks/useMannageddata";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BodyEditStory from "../modal/BodyEditStory";

interface Props{
    storys?: any;
}

const {Title, Text} = Typography;

function StoryData({
    storys
}:Props) {

    const router = useRouter();
    const dataconfig = configDataStorys(storys);
    const [query, setQuery] = useState('');
    const {mutate: mutateStory} = useManageddata();

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_st?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const handleDelete = (story: any) => {

        axios.delete(`/api/storys/${story?.id}`)
            .then(() => {
                mutateStory();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Story has been deleted!')
            })
    };

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_st',
            key: 'name_st',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'desc_st',
            key: 'desc_st',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By UserId',
            dataIndex: 'userId_st',
            key: 'userId_st',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.userId_st}</Text>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status_st',
            key: 'status_st',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.status_st}</Text>
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
                        <div>
                            <BodyEditStory
                                story={record}
                            />
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

export default StoryData