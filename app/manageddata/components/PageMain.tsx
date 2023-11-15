"use client"
import React from 'react'
import Header from './Header'
import useManageddata from '@/app/hooks/useMannageddata'
import ProjectData from './table/ProjectData';
import EpicData from './table/EpicData';
import StoryData from './table/StoryData';
import TaskData from './table/TaskData';
import NotificationData from './table/NotificationData';
import CommentData from './table/CommentData';
import { Collapse, Typography } from 'antd';
import useUsers from '@/app/hooks/useUsers';
import UserData from './table/UserData';

const {Title, Text} = Typography;

function PageMain() {
    const data = useManageddata()?.data;
    const dataUsers = useUsers()?.data;
    return (
        <div className='w-full h-full p-2'>
            <Header />
            <div className='w-full h-[800px] ml-2 overflow-y-auto'>
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '1',
                            label: <>
                                <Title level={5}>1. Users</Title>
                            </>,
                            children: <>
                                <UserData users={dataUsers}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '2',
                            label: <>
                                <Title level={5}>2. Projects</Title>
                            </>,
                            children: <>
                                <ProjectData projects={data?.projects}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '3',
                            label: <>
                                <Title level={5}>3. Epics</Title>
                            </>,
                            children: <>
                                <EpicData epics={data?.epics}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '4',
                            label: <>
                                <Title level={5}>4. Storys</Title>
                            </>,
                            children: <>
                                <StoryData storys={data?.storys}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '5',
                            label: <>
                                <Title level={5}>5. Tasks</Title>
                            </>,
                            children: <>
                                <TaskData tasks={data?.tasks}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '6',
                            label: <>
                                <Title level={5}>6. Notifications</Title>
                            </>,
                            children: <>
                                <NotificationData notifications={data?.notifications}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
                <Collapse
                    collapsible="header"
                    accordion
                    items={[
                        {
                            key: '7',
                            label: <>
                                <Title level={5}>7. Comments</Title>
                            </>,
                            children: <>
                                <CommentData comments={data?.comments}/>
                            </>,
                        },
                    ]}
                    className="mt-5 w-full fix_collap"
                />
            </div>
        </div>
    )
}

export default PageMain