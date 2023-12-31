"use client"
import { optionsStatus } from "@/app/config/options";
import { daysdifference, takeDataAddStatus, takeDataStorys } from "@/app/equation";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { DatePicker, Popconfirm, Select, Table, TableColumnType, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import * as _ from "lodash/fp";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import customParseFormat from 'dayjs/plugin/customParseFormat';
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


function TableDutiesStory({
    project,
    currentUser,
}: Props) {

    
    const router = useRouter();
    const data = takeDataStorys(project);
    const users = project?.users;
    const { mutate: mutateProject } = useProject(project?.id);

    const dataSelect = _.flow(
        _.filter(
        (item: any) =>
            item.assignto === currentUser.id
        ),
    )(data);

    const handleChangeOptionStatus = (data: any, story: any) => {
        
        if(data){
            axios.post(`/api/storys/${story?.id}`, {
                status: data,
            })
                .then(() => {
                    mutateProject();
                    router.refresh();
                })
                .catch(() => {
                    toast.error('Something went wrong!')
                })
                .finally(() => {
                    toast.success('Status story has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleChangeOptionAssign = (data: any, story: any) => {
        if(data){
            axios.post(`/api/storys/${story?.id}`, {
                assignto: data,
                isAssign: true,
            })
                .then(() => {
                    router.refresh();
                    mutateProject();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    toast.success('Assigned user has been updated!')
                });
        }else{
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = (story: any) => {
        axios.delete(`/api/storys/${story?.id}`)
            .then(() => {
                router.refresh();
                mutateProject();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Story has been deleted!')
            });
    }

    const onChange = (date: any, story: any) => {
        axios.post(`/api/storys/${story?.id}`, {
            timework: date,
        })
            .then(() => {
                router.refresh();
                mutateProject();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Time has been updated!')
            });
    };

    const handleGoToStory = (ev: any, story: any) => {
        ev.preventDefault();
        return router.push(`/storys/${story?.id}`)
    };

    const takenewStatus = takeDataAddStatus(project?.addStatus)?.listStory;

    const mapNewStatus = takenewStatus.map((item: any) => ({
        label: item.label,
        value: item.value,
    })) ?? [];

    const configdate = {
        endDate: new Date('2024-01-01T24:22:08.621Z'),
        startDate:new Date(project?.timework[0]),
    }
    
    const columns: TableColumnType<any>[] = [
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
            width: '25%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Epic ID',
            dataIndex: 'epicId',
            key: 'epicId',
            width: '18%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.epicId}</Text>
                )
            },
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
                    <div className="w-full">
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
                        <DoubleRightOutlined
                            className='cursor-pointer text-xl' 
                            style={{color:'green'}}
                            onClick={(e) => handleGoToStory(e, record)}
                        />
                    </div>
                )
            },
        },
    ];

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

export default TableDutiesStory