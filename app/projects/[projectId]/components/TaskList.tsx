"use client"
import React, { useState } from 'react'
import TaskItem from './TaskItem'
import HeaderProjects from '../../components/HeaderProjects';
import CreateTaskModal from '../modal/CreateTaskModel';
import { Projects } from '@prisma/client';

interface Props{
    project: any;
}

function TaskList({project}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModalCreate = () => setIsModalOpen(true);
    const taskArray = project?.tasks;
    const reverseArray: [] = taskArray.slice().reverse();

    return (
        <>
            <CreateTaskModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <HeaderProjects title='List task' create={handleOpenModalCreate}/>
            <div className='px-5'>
                {reverseArray?.map((pjct: any) => (
                    <TaskItem task={pjct} key={pjct?.id}/>
                ))}
            </div>
        </>
    )
}

export default TaskList