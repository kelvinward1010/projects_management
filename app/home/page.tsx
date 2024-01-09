"use client"
import LoadingModal from '../components/LoadingModal';
import useCurrentUser from '../hooks/useCurrentUser';
import useGetAllProject from '../hooks/useGetAllProject';
import PageHome from './components/PageHome';

function Home() {
  const {data: projects, isLoading} = useGetAllProject();
  const currentUser = useCurrentUser()?.data;
  
  if(isLoading){
    return(
      <LoadingModal />
    )
  }

  return (
    <div>
        <PageHome projects={projects} currentUser={currentUser}/>
    </div>
  )
}

export default Home