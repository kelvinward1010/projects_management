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

function PageMain() {
    const data = useManageddata()?.data;
    
    return (
        <div className='w-full h-full p-2'>
            <Header />
            <div className='w-full h-[800px] ml-2 overflow-y-auto'>
                <ProjectData projects={data?.projects}/>
                <EpicData epics={data?.epics}/>
                <StoryData storys={data?.storys}/>
                <TaskData tasks={data?.tasks}/>
                <NotificationData notifications={data?.notifications}/>
                <CommentData comments={data?.comments}/>
            </div>
        </div>
    )
}

export default PageMain