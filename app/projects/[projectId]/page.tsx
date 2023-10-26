import React from 'react'
import getProjectById from '@/app/actions/getProjectById'
import TaskList from './components/TaskList'

interface Props {
    projectId: string
}
const ProjectPageId = async ({ params }: { params: Props }) => {
    const projectId = params.projectId
    const project = await getProjectById(projectId)
    
    return (
        <div>
            <TaskList project={project}/>
        </div>
    )
}

export default ProjectPageId