import React from 'react'
import ProjectList from './components/ProjectList'
import getUsers from '../actions/getUsers'
import getProjects from '../actions/getProjects';

async function ProjectsPage() {
  const users = await getUsers();
  const projects = await getProjects();
  
  return (
    <div>
      <ProjectList projects={projects} users={users}/>
    </div>
  )
}

export default ProjectsPage