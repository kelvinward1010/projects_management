import React from 'react'
import ScheduleTop from './ScheduleTop'
import { Projects } from '@prisma/client'
import ScheduleConversationList from './ScheduleConversationList';
import FormConversationInProject from './FormConversationInProject';

interface Props {
  project?: Projects;
}

function ScheduleProject({
  project
}:Props) {
  return (
    <div className='h-[900px] w-full'>
      <ScheduleTop project={project}/>
      <ScheduleConversationList project={project}/>
      <FormConversationInProject project={project} />
    </div>
  )
}

export default ScheduleProject