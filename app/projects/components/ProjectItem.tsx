"use client"
import { workCompletionRateFormula } from '@/app/equation'
import useUser from '@/app/hooks/useUser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Flex, Row, Tooltip, Typography } from 'antd';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai'

interface Props {
    project: any;
}

const { Text } = Typography;

function ProjectItem({project}:Props) {

    const router = useRouter();
    const userCreatedProject = useUser(project?.createdByWho)?.data;
    const usersInProject = project?.users;

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push(`/projects/${project?.id}`)
    };

    const completePrecent = Number(workCompletionRateFormula(project?.tasks).toFixed(3));
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

    return (
        <>
            <Card
                title={project?.title}
                extra={
                    <Tooltip title="Go to project" placement="top">
                        <AiOutlineDoubleRight 
                            className='
                                text-2xl
                                font-medium
                                cursor-pointer
                                text-white
                            '
                            onClick={(e: any) => handleGoToProject(e)}
                        />
                    </Tooltip>
                }
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
                            <Tooltip title={user?.name} placement="top">
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
        </>
    )
}

export default ProjectItem