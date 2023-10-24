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
    console.log(projects)
    return (
        <>
            <CreateModal
                users={users as User[]}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <HeaderProjects create={handleOpenModalCreate} title='List project'/>
            <div className='px-5'>
                <ProjectItem />
            </div>
        </>
    )
}

export default ProjectList