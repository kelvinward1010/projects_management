import React from 'react';

interface Props {
    issues?: any
}

function TaskInColumn({
    issues
}:Props) {
  return (
    <div 
        className='
            my-2
            h-12
            w-full
            border-2
            border-teal-600
            flex
            items-center
            justify-between
            cursor-pointer
            hover:bg-teal-500
            hover:text-white
    '>
            <p
                className='
                    line-clamp-1
                    pl-5
                '
            >
                {issues?.title}
            </p>
    </div>
  )
}

export default TaskInColumn