"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import useIssues from '@/app/hooks/useIssues';

interface Props {
    issue: any
}

function IssuesItem({
    issue
}:Props) {

    const router = useRouter();
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const handleOpenDelete = () => setIsOpenDelete(true);

    const [isLoading, setIsLoading] = useState(false);
    const {mutate: mutateIssues } = useIssues(issue?.taskId as string);
    
    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/issues/${issue?.id}`)
            .then(() => {
                mutateIssues()
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Issues has been deleted!')
            })
    },[router, issue?.id]);


    return (
        <>
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
                    {issue?.title}
                </p>
                <div className='flex justify-center items-center'>
                    {isOpenDelete && 
                    <div className='h-fit w-fit p-2 flex gap-2 justify-center items-center'>
                        <Button
                            disabled={isLoading}
                            danger
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={() => setIsOpenDelete(false)}
                        >
                            Cancel
                        </Button>
                    </div>}
                    <button
                        className='
                            text-2xl
                            hover:text-red-600
                            font-medium
                            pr-2
                        '
                        onClick={handleOpenDelete}
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>  
        </>
    )
}

export default IssuesItem