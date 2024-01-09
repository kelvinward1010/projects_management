"use client"

import { daysdifference, takeDataAddStatus, takeDataTasks } from "@/app/equation"
import useNotifications from "@/app/hooks/useNotifications";
import { DatePicker, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillBug, AiFillLeftSquare } from "react-icons/ai";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { optionsStatus, optionsTypes } from "@/app/config/options";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import * as _ from "lodash/fp";
import { disableDateRanges } from "@/app/equation/datetime";
import useProject from "@/app/hooks/useProject";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props {
    project?: any;
    currentUser?: any;
}


function TableDutiesTasks({
    project,
    currentUser
}:Props) {

    const router = useRouter();

    const data = takeDataTasks(project)
    const users = project?.users;
    const {mutate: mutateNoti} = useNotifications()
    const { mutate: mutateProject } = useProject(project?.id);

    const dataSelect = _.flow(
        _.filter(
        (item: any) =>
            item.assignto === currentUser.id
        ),
    )(data);
    

    const handleChangeOptionAssign = (data: any, internals: any) => {

        if(data){
            axios.post(`/api/tasks/${internals?.id}`, {
                assignto: data,
                isAssign: true,
            })
                .then(() => {
                    mutateProject();
                    router.refresh();
                    mutateNoti();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Assigned user has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionStatus = (data: any, internals: any) => {
        const currentDate = new Date();
        
        if(data !== 'Done'){
            axios.post(`/api/tasks/${internals?.id}`, {
                status: data,
                completionTime: '',
            })
                .then(() => {
                    mutateProject();
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Status internals has been updated!')
                });
        }else if(data === 'Done'){
            axios.post(`/api/tasks/${internals?.id}`, {
                status: data,
                completionTime: currentDate,
            })
                .then(() => {
                    mutateProject();
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Status internals has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionType = (data: any, internals: any) => {
        if(data){
            axios.post(`/api/tasks/${internals?.id}`, {
                type: data,
            })
                .then(() => {
                    mutateProject();
                    router.refresh();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Type internals has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = (internals: any) => {

        axios.delete(`/api/tasks/${internals?.id}`)
            .then(() => {
                mutateProject();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Internals has been deleted!')
            });
    }

    const onChange = (date: any, internals: any) => {
        axios.post(`/api/tasks/${internals?.id}`, {
            timework: date,
        })
            .then(() => {
                mutateProject();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time has been updated!')
            });
    };

    const handleGoToInTask = (task: any) => {
        return router.push(`/tasks/${task?.id}`)
    };

    const takenewStatus = takeDataAddStatus(project?.addStatus)?.listInternal;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const configdate = {
        endDate: new Date(project?.timework[1]),
        startDate:new Date(project?.timework[0]),
    }

    const columns: TableColumnType<any>[] = [
        {
            title: 'Icon',
            width: '4%',
            render: (_: any, record: any) => {
                const iconType = record?.type === 'Bug' ? 
                    <Text className="text-xl text-red-600">
                        <AiFillBug /> 
                    </Text>
                    : 
                    <Text className="text-xl text-green-600">
                        <AiFillLeftSquare />
                    </Text>
                return iconType
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionType(e, record)}}
                        options={optionsTypes}
                        value={record?.type}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';

                return (
                    <Select
                        onChange={(e) => {handleChangeOptionStatus(e, record)}}
                        options={[
                            ...optionsStatus,
                            ...mapNewStatus
                        ]}
                        value={record?.status}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignto',
            key: 'assignto',
            width: '10%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Select
                        onChange={(e) => {handleChangeOptionAssign(e, record)}}
                        options={users?.map((user: any) => ({
                            value: user?.id,
                            label: user?.name
                        }))}
                        value={record?.assignto}
                        className='select-in-table'
                        style={{width:"100%", border: `3px solid ${style}`, borderRadius: '7px'}}
                    />
                )
            },
        },
        {
            title: 'Estimed time',
            dataIndex: 'timework',
            key: 'timework',
            width: '25%',
            render: (_: any, record: any) => {

                const getTime = daysdifference(record?.timework[0],record?.timework[1])
                
                return (
                    <>
                        {record?.timework && <RangePicker
                            showTime 
                            onChange={(e) => onChange(e, record)} 
                            defaultValue={
                                [dayjs(record?.timework[0], dateFormat), dayjs(record?.timework[1], dateFormat)]
                                || null
                            }
                            format={dateFormat}
                            className="date-picker"
                            disabledDate={disableDateRanges(configdate)}
                        />}
                        <div className="flex items-center flex-start gap-x-2">
                            <Text>Time:</Text>
                            <Text>{`${getTime.days} ngày ${getTime.hours} giờ ${getTime.minutes} phút ${getTime.seconds} giây`|| null}</Text>
                        </div>
                    </>
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
                                title="Delete the internal"
                                description="Are you sure to delete this internal?"
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
                        <DoubleRightOutlined
                            className="cursor-pointer text-teal-600"
                            onClick={() => handleGoToInTask(record)}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={dataSelect ?? []}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default TableDutiesTasks