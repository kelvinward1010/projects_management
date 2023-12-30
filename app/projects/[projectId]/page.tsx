"use client"
import LoadingModal from '@/app/components/LoadingModal'
import EpicList from './components/EpicList'
import useProject from '@/app/hooks/useProject'

interface Props {
    projectId: string
}
const ProjectPageId = ({ params }: { params: Props }) => {
    const projectId = params.projectId
    const {data: project, isLoading: loadingProject } = useProject(projectId);
    
    if(loadingProject){
        return(
          <LoadingModal />
        )
    }
    
    return (
        <div>
            <EpicList project={project}/>
        </div>
    )
}

export default ProjectPageId