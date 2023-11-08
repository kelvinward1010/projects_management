import React from 'react'
import getProjectById from '@/app/actions/getProjectById'
import EpicList from './components/EpicList'

interface Props {
    projectId: string
}
const ProjectPageId = async ({ params }: { params: Props }) => {
    const projectId = params.projectId
    const project = await getProjectById(projectId)
    
    return (
        <div>
            <EpicList project={project}/>
        </div>
    )
}

export default ProjectPageId