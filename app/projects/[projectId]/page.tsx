import React from 'react'
import HeaderProjects from '../components/HeaderProjects'
import TaskList from './components/TaskList'
import getProjectById from '@/app/actions/getProjectById'
import { Projects } from '@prisma/client'

interface Props {
    projectId: string
}
const ProjectPageId = async ({ params }: { params: Props }) => {
    const projectId = params.projectId
    const project = await getProjectById(projectId)
    
    return (
        <div>
            <TaskList project={project as Projects}/>
        </div>
    )
}

export default ProjectPageId