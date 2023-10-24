"use client"
import React, { useState } from 'react'
import ProjectItem from './ProjectItem'
import HeaderProjects from './HeaderProjects'
import { Projects, User } from '@prisma/client'
import CreateModal from './modals/CreateModal'

interface Props {
    projects?: Projects[],
    users?: User[],
}

function ProjectList({projects, users}:Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalCreate = () => setIsModalOpen(true);
    
    return (
        <>
            <CreateModal
                users={users as User[]}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <HeaderProjects create={handleOpenModalCreate} title='List project'/>
            <div className='px-5'>
                {projects?.map((project) => (
                    <ProjectItem key={project?.id} project={project} />
                ))}
            </div>
        </>
    )
}

export default ProjectList