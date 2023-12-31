"use client"
import { takeDataNotiNotSeen, workCompletionRateFormula } from '@/app/equation'
import useUser from '@/app/hooks/useUser';
import { NotificationFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Col, DatePicker, Dropdown, Flex, Row, Tooltip, Typography } from 'antd';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai'
import dayjs from "dayjs";


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

interface Props {
    project: any;
}

const { Text } = Typography;

function ProjectItem({project}:Props) {

    const router = useRouter();
    const userCreatedProject = useUser(project?.createdByWho)?.data;
    const usersInProject = project?.users;
    const [openNoti,setOpenNoti] = useState(false)
    const [isSee, setIsSee] = useState(false);

    const listNoti = project?.notiProject;
    const notificationProjects = takeDataNotiNotSeen(listNoti);

    const leader = project?.projectLeader[project?.projectLeader?.length -1]
    const userLeader = useUser(leader)?.data;
   
    const handleNotiSeen = () => {
        notificationProjects?.forEach((notificationProject) =>{
            axios.post(`/api/notiprojects/${notificationProject?.id}`, {
                isSeen: true,
            })
                .then(() => {
                    router.refresh();
                    setIsSee(true);
                })
        })
    }

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push(`/projects/${project?.id}`)
    };

    const completePrecent = Number(workCompletionRateFormula(project?.epics).toFixed(3));

    const style = () => {
        return completePrecent === 100 ? "green" : "red";
    }

    const createdAt = useMemo(() => {
        if (!project?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(project?.createdAt));
    }, [project?.createdAt])

    const items = listNoti?.length !== 0 ? listNoti?.slice(0,8)?.reverse().map((item: any) =>({
        label: <>
            <div className='w-full h-fit p-2 border border-teal-600 rounded mt-2'>
                <Text className='w-full'>{item?.descNoti}</Text>
            </div>
        </>,
        key: item?.id
    })) : [{
        label: <>
            <div className='w-full h-[100px] flex justify-center items-center p-2 mt-2'>
                <Text className='w-full'>Don't have any notifications</Text>
            </div>
        </>,
        key: 0
    }];

    const FormGotoInside = () => {
        return(
            <div className='flex justify-between gap-x-2 items-center'>
                <AiOutlineDoubleRight 
                    className='
                        text-2xl
                        font-medium
                        cursor-pointer
                        text-white
                    '
                    onClick={(e: any) => handleGoToProject(e)}
                />
            </div>
        )
    }

    const stylestatus = () => {
        return project?.status === 'Dự án đã hoàn thành' 
                                    ? "green" 
                                    : project?.status === 'Dự án đang bị tạm dừng'
                                    ? "red"
                                    : "blue";
    }

    return (
        <div>
            <Card
                title={project?.title}
                extra={FormGotoInside()}
                style={{
                    width: 500,
                }}
                className='cardproject'
            >
                <Row justify={"start"}>
                    <Col span={2}>
                        <Dropdown
                            menu={{
                            items,
                            }}
                            trigger={['click']}
                        >
                            <Badge count={ isSee === true ? 0 : notificationProjects?.length}>
                                <NotificationFilled 
                                    className='
                                        text-2xl
                                        font-medium
                                        cursor-pointer
                                    '
                                    onClick={() => {
                                        setOpenNoti(!openNoti)
                                        handleNotiSeen()
                                    }}
                                />
                            </Badge>
                        </Dropdown>
                    </Col>
                    <Col span={10}>
                        <Text className={'font-medium'}>Notification:</Text>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className={'font-medium'}>Percent of job completion:</Text>
                    </Col>
                    <Col span={10}>
                        <Text style={{color: `${style()}`}}>{completePrecent || 0} %</Text>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className={'font-medium'}>Status Project:</Text>
                    </Col>
                    <Col span={10}>
                        <Text style={{color: `${stylestatus()}`}}>{project?.status}</Text>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className={'font-medium'}>Project created by:</Text>
                    </Col>
                    <Col span={10}>
                        <Text>{userCreatedProject?.name}</Text>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className={'font-medium'}>Leader Project:</Text>
                    </Col>
                    <Col span={10}>
                        <Text>{userLeader?.name}</Text>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className={'font-medium'}>Created:</Text>
                    </Col>
                    <Col span={10}>
                        <Text>{createdAt} ago</Text>
                    </Col>
                </Row>
                <Flex align={'flex-start'} justify={'flex-start'} vertical className="w-full h-9">
                    <Text className="font-medium">Time project to be completed:</Text>
                    <RangePicker 
                        className="range-time"
                        showTime 
                        defaultValue={
                            [dayjs(project?.timework[0], dateFormat), dayjs(project?.timework[1], dateFormat)]
                            || null
                        }
                        format={dateFormat}
                        disabled
                    />
                </Flex>
                <Flex vertical className='mt-5'>
                    <Text className={'font-medium'}>Members currently participating:</Text>
                    <Avatar.Group maxCount={7}>
                        {usersInProject?.map((user: any) => (
                            <Tooltip key={user?.id} title={user?.name} placement="top">
                                <Avatar 
                                    src={user?.image} 
                                    icon={<UserOutlined />} 
                                    className='bg-teal-600 sursor-pointer'
                                />
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Flex>
            </Card>
        </div>
    )
}

export default ProjectItem