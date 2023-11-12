"use client"

import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Popconfirm, Table, TableColumnType, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

interface Props{
    data?: any;
}

function TableSetting({
    data
}:Props) {

    const router = useRouter();

    const handleDelete = (status: any) => {

        axios.delete(`/api/addstatus/${status?.id}`)
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Status has been deleted!')
            });
    }

    const dataMapWithKey = data?.map((item: any) => ({
        key: item?.id,
        id: item.id,
        label: item.label,
        value: item.value,
    }))

    const columns: TableColumnType<any>[] = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
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
                                title="Delete this status"
                                description="Are you sure to delete this status?"
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
                    </div>
                )
            },
        },
    ]
    return (
        <div className="w-[700px] h-full ml-32">
            <Table
                bordered
                columns={columns}
                dataSource={dataMapWithKey ?? []}
                pagination={{
                    pageSize: 5,
                }}
            />
        </div>
    )
}

export default TableSetting