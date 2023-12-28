"use client"
import React, { useState } from 'react'
import HeaderInProject from '../../components/HeaderInProject';
import CreateEpicModel from '../modal/CreateEpicModel';
import DeleteModal from '../../components/modals/DeleteModal';
import HeaderTop from '../../components/HeaderTop';
import EpicItem from './EpicItem';
import { takeleader } from '@/app/equation';
import useUser from '@/app/hooks/useUser';

interface Props{
    project: any;
}

function EpicList({project}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const handleOpenModalCreate = () => setIsModalOpen(true);
    const handleOpenModalDelete = () => setIsModalOpenDelete(true);
    const taskArray = project?.epics;
    const reverseArray: [] = taskArray?.slice().reverse();
    const leader = takeleader(project?.projectLeader);
    const userLeader = useUser(leader)?.data;
    
    return (
        <>
            <CreateEpicModel
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
            <HeaderInProject title='Epics' create={handleOpenModalCreate}/>
            <div className='px-5'>
                {reverseArray?.map((pjct: any) => (
                    <EpicItem userIdCreatedProject={userLeader?.id} epic={pjct} key={pjct?.id}/>
                ))}
            </div>
        </>
    )
}

export default EpicList