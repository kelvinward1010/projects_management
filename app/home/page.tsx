import React from 'react'
import PageHome from './components/PageHome'
import getProjects from '../actions/getProjects';

async function Home() {
  const projects = await getProjects();
  return (
    <div>
        <PageHome projects={projects}/>
    </div>
  )
}

export default Home