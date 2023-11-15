"use client"

import { Input, Modal, Popconfirm, Table, TableColumnType, Typography } from "antd";
import { configDataProjects } from "../configdata";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import * as _ from "lodash/fp";
import { useState } from "react";
import axios from "axios";
import useManageddata from "@/app/hooks/useMannageddata";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BodyEditProject from "../modal/BodyEditProject";

interface Props{
    projects?: any;
}

const {Title, Text} = Typography;

function ProjectData({
    projects
}:Props) {

    const router = useRouter();
    const dataconfig = configDataProjects(projects);
    const [query, setQuery] = useState('');
    const {mutate: mutateProject} = useManageddata();
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const dataSelect = _.flow(
        _.filter(
          (item: any) =>
            item?.name_pj?.includes(query) ||
            (query ?? "") === "",
        ),
    )(dataconfig);

    const handleDelete = (project: any) => {

        axios.delete(`/api/projects/${project?.id}`)
            .then(() => {
                mutateProject();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Project has been deleted!')
            })
    };

    const columns: TableColumnType<any>[] = [
        {
            title: 'Name',
            dataIndex: 'name_pj',
            key: 'name_pj',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Created By UserId',
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
                            <Text key={user?.id} className='line-clamp-1'>{user?.name}</Text>
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
                            <BodyEditProject 
                                project={record}
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

export default ProjectData