import React from 'react'
import ScheduleConversationItem from './ScheduleConversationItem'
import { Projects } from '@prisma/client'

interface Props {
    project?: Projects;
}

function ScheduleConversationList({
    project
}:Props) {
    return (
        <div className='px-5 overflow-y-auto h-[800px]'>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
            <ScheduleConversationItem project={project}/>
        </div>
    )
}

export default ScheduleConversationList