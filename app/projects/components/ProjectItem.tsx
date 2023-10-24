"use client"
import { Projects } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai'

interface Props {
    project: Projects;
}

function ProjectItem({project}:Props) {

    const router = useRouter();

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push(`/projects/${project?.id}`)
    }

    return (
        <div className='
            my-2
            h-12
            w-full
            border-2
            border-teal-600
            flex
            items-center
            justify-between
            cursor-pointer
            hover:bg-teal-700
            hover:text-white
        '>
            <p
                className='
                line-clamp-1
                pl-5
            '
            >
                {project?.title}
            </p>
            <button
                className='
                    text-2xl
                    px-5
                    hover:text-green-600
                    font-medium
                '
                onClick={(e) => handleGoToProject(e)}
            >
                <AiOutlineDoubleRight />
            </button>
        </div>
    )
}

export default ProjectItem