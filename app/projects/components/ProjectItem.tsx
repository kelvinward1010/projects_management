"use client"
import { workCompletionRateFormula } from '@/app/equation'
import { Projects } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineDoubleRight } from 'react-icons/ai'
import DeleteModal from './modals/DeleteModal'

interface Props {
    project: any;
}

function ProjectItem({project}:Props) {

    const router = useRouter();

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push(`/projects/${project?.id}`)
    };

    const completePrecent = Number(workCompletionRateFormula(project?.tasks).toFixed(3));
    const unfinishedPercent = 100 - completePrecent;

    return (
        <>
            <div className='
                mt-4
                h-16
                w-full
                border-2
                border-teal-600
                cursor-pointer
                hover:bg-teal-700
                hover:text-white
                flex
                flex-col
                justify-between
            '>
                <div className='
                    mt-3
                    flex
                    items-center
                    justify-between
                '>
                    <p
                        className='
                        line-clamp-1
                        pl-5
                    '
                    >
                        {project?.title}
                    </p>
                    <div className='px-5'>
                        <button
                            className='
                                text-2xl
                                px-3
                                hover:text-green-600
                                font-medium
                            '
                            onClick={(e) => handleGoToProject(e)}
                        >
                            <AiOutlineDoubleRight />
                        </button>
                    </div>
                </div>
                {(completePrecent || unfinishedPercent) ? <div className='
                    w-full
                    h-4
                    flex
                    text-sm
                '>
                    <div 
                        style={{
                            width: `${completePrecent}%`,
                            height: '100%',
                        }}
                        className='flex text-white justify-center items-center bg-lime-500'
                    >
                        {completePrecent === 0 ? null : (completePrecent+"%")}
                    </div>
                    <div 
                        style={{
                            width: `${unfinishedPercent}%`,
                            height: '100%',
                        }}
                        className='flex text-white justify-center items-center bg-[#FF0000]'
                    >
                        {unfinishedPercent === 0 ? null : (unfinishedPercent+"%")}
                    </div>
                </div>: null}
            </div>
        </>
    )
}

export default ProjectItem