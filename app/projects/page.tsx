"use client"
import ProjectList from './components/ProjectList'
import useGetAllProject from '../hooks/useGetAllProject';
import LoadingModal from '../components/LoadingModal';
import useOtherUsers from '../hooks/useOtherUsers';

function ProjectsPage() {
  const {data: users, isLoading: loadingUsers} = useOtherUsers();
  const {data: projects, isLoading: loadingProjects} = useGetAllProject();
  
  if(loadingProjects && loadingUsers){
    return(
      <LoadingModal />
    )
  }

  return (
    <div>
      <ProjectList projects={projects} users={users}/>
    </div>
  )
}

export default ProjectsPage