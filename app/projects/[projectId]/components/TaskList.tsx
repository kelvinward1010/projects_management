"use client"
import React, { useState } from 'react'
import TaskItem from './TaskItem'
import HeaderInProject from '../../components/HeaderInProject';
import CreateTaskModal from '../modal/CreateTaskModel';
import DeleteModal from '../../components/modals/DeleteModal';
import HeaderTop from '../../components/HeaderTop';

interface Props{
    project: any;
}

function TaskList({project}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const handleOpenModalCreate = () => setIsModalOpen(true);
    const handleOpenModalDelete = () => setIsModalOpenDelete(true);
    const taskArray = project?.tasks;
    const reverseArray: [] = taskArray.slice().reverse();
    
    return (
        <>
            <CreateTaskModal
                project={project}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <DeleteModal
                projectId={project?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
            />
            <HeaderTop project={project} title={project?.title} hadleDelete={handleOpenModalDelete}/>
            <HeaderInProject title='Tasks' create={handleOpenModalCreate}/>
            <div className='px-5'>
                {reverseArray?.map((pjct: any) => (
                    <TaskItem task={pjct} key={pjct?.id}/>
                ))}
            </div>
        </>
    )
}

export default TaskList