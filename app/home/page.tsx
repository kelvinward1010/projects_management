"use client"
import LoadingModal from '../components/LoadingModal';
import useGetAllProject from '../hooks/useGetAllProject';
import PageHome from './components/PageHome';

function Home() {
  const {data: projects, isLoading} = useGetAllProject();
  if(isLoading){
    return(
      <LoadingModal />
    )
  }
  return (
    <div>
        <PageHome projects={projects} />
    </div>
  )
}

export default Home