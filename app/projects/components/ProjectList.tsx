"use client"
import React, { useState } from 'react'
import ProjectItem from './ProjectItem'
import HeaderProjects from './HeaderProjects'
import { Projects, User } from '@prisma/client'
import CreateModal from './modals/CreateModal'
import { Flex } from 'antd'

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
            <HeaderProjects 
                create={handleOpenModalCreate} 
                title='Projects'
                projects={projects}
            />
            <div className='px-5 mt-5'>
                <Flex wrap="wrap" className='gap-10'>
                    {projects?.map((project) => (
                        <ProjectItem key={project?.id} project={project} />
                    ))}
                </Flex>
            </div>
        </>
    )
}

export default ProjectList