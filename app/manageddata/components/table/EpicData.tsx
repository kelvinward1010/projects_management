"use client"

import { Input, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import * as _ from "lodash/fp";
import { useState } from "react";
import { configDataEpics } from "../configdata";
import { optionsStatus } from "@/app/config/options";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

interface Props{
    epics?: any;
}

const {Title, Text} = Typography;

function EpicData({
    epics
}:Props) {

    const dataconfig = configDataEpics(epics);
    const [query, setQuery] = useState('');

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_ep?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_ep',
            key: 'name_ep',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By',
            dataIndex: 'creatorId',
            key: 'creatorId',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'status_ep',
            key: 'status_ep',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status_ep === 'Done' ? 'green' : record?.status_ep === 'Improgress' ? 'blue' : 'black';

                return (
                    <Select
                        onChange={(e) => {}}
                        options={[
                            ...optionsStatus,
                        ]}
                        value={record?.status_ep}
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
            <Title level={5}>2. Epics</Title>
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

export default EpicData