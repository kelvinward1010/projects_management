"use client"
import { workCompletionRateFormula } from '@/app/equation'
import useUser from '@/app/hooks/useUser';
import { NotificationFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Flex, Row, Tooltip, Typography } from 'antd';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai'

interface Props {
    project: any;
}

const { Text } = Typography;

function ProjectItem({project}:Props) {

    const router = useRouter();
    const userCreatedProject = useUser(project?.createdByWho)?.data;
    const usersInProject = project?.users;
    const [openNoti,setOpenNoti] = useState(false)

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push(`/projects/${project?.id}`)
    };

    const completePrecent = Number(workCompletionRateFormula(project?.epics).toFixed(3));
    const unfinishedPercent = 100 - completePrecent;

    const currentDate = new Date();

    useEffect(() => {
        if(unfinishedPercent === 0){
            axios.post(`/api/projects/${project?.id}`, {
                completionTime: currentDate,
                status: 'Done',
            })
                .then(() => {
                    router.refresh();
                })
        }else{
            axios.post(`/api/projects/${project?.id}`, {
                completionTime: '',
                status: '',
            })
                .then(() => {
                    router.refresh();
                })
        }
    },[completePrecent, unfinishedPercent, router])

    const style = () => {
        return completePrecent === 100 ? "green" : "red";
    }

    const createdAt = useMemo(() => {
        if (!project?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(project?.createdAt));
    }, [project?.createdAt])

    const items = [
        {
          label: <>
            <div className='w-64 h-[400px]'>
                Notification
            </div>
          </>,
          key: '0',
        },
    ]

    const FormGotoInside = () => {
        return(
            <div className='flex justify-between gap-x-2 items-center'>
                <Dropdown
                    menu={{
                    items,
                    }}
                    trigger={['click']}
                >
                    <NotificationFilled 
                        className='
                            text-2xl
                            font-medium
                            cursor-pointer
                            text-white
                        '
                        onClick={() => setOpenNoti(!openNoti)}
                    />
                </Dropdown>
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
                        <Text className={'font-medium'}>Project created by:</Text>
                    </Col>
                    <Col span={10}>
                        <Text>{userCreatedProject?.name}</Text>
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
                <Flex vertical>
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