"use client"
import React, { useState } from 'react'
import TaskItem from './TaskItem'
import HeaderProjects from '../../components/HeaderProjects';
import CreateTaskModal from '../modal/CreateTaskModel';
import { Projects } from '@prisma/client';

interface Props{
    project: Projects;
}

function TaskList({project}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModalCreate = () => setIsModalOpen(true);
    
    return (
        <>
            <CreateTaskModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <HeaderProjects title='List task' create={handleOpenModalCreate}/>
            <div className='px-5'>
                <TaskItem />
            </div>
        </>
    )
}

export default TaskList