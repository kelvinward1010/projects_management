"use client"
import React, { useState } from 'react'
import ProjectItem from './ProjectItem'
import HeaderProjects from './HeaderProjects'
import { Projects, User } from '@prisma/client'
import CreateModal from './modals/CreateModal'
import { Flex } from 'antd'
import * as _ from "lodash/fp";

interface Props {
    projects?: Projects[],
    users?: User[],
}

function ProjectList({projects, users}:Props) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chooseStatusProject, setChooseStatusProject] = useState('all');
    const [queryNameProject, setQueryNameProject] = useState('');
    const handleOpenModalCreate = () => setIsModalOpen(true);

    const dataSelect = _.flow(
        _.filter(
        (item: any) =>
            item.status === chooseStatusProject || chooseStatusProject === 'all'
        ),
        _.filter(
            (item: any) =>
                item?.title?.includes(queryNameProject) ||
                (queryNameProject ?? "") === "",
        ),
    )(projects);
    
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
                setStatusProject={setChooseStatusProject}
                chooseStatusProject={chooseStatusProject}
                setQueryNameProject={setQueryNameProject}
            />
            <div className='px-5 mt-5'>
                <Flex wrap="wrap" className='gap-10'>
                    {dataSelect?.map((project: any) => (
                        <ProjectItem key={project?.id} project={project} />
                    ))}
                </Flex>
            </div>
        </>
    )
}

export default ProjectList