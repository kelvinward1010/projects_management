"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai'

function ProjectItem() {

    const router = useRouter();

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        return router.push('/projects/123')
    }

    return (
        <div className='
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
                Title Project
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