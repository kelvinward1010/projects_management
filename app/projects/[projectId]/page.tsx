import LoadingModal from '@/app/components/LoadingModal'
import EpicList from './components/EpicList'
import getProjectById from '@/app/actions/getProjectById'

interface Props {
    projectId: string
}
const ProjectPageId = async ({ params }: { params: Props }) => {
    const project = await getProjectById(params.projectId)
    
    if(!project){
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