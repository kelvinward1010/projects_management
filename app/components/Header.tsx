import React from 'react'
import Avatar from './Avatar'
import getCurrentUser from '../actions/getCurrentUser';

async function Header() {
    const currentUser = await getCurrentUser();
    return (
        <div className='sticky flex flex-col justify-between md:flex-row items-center bg-gray-500/10 p-5 border-2 border-b-teal-600'>
            <div
                className='
                absolute
                top-0
                left-0
                w-full
                h-96
                bg-gradient-to-br
                from-pink-400
                to-[#0055D1]
                rounded-md
                filter
                blur-3xl
                opacity-50
                -z-50
            '
            />
            <h1 className='
                text-sky-700 
                font-medium 
                text-4xl'
            >Projects Management</h1>

            <div
                className="cursor-pointer hover:opacity-75 transition"
            >
                <Avatar user={currentUser} image={currentUser?.profileImage || currentUser?.image} />
            </div>
        </div>
    )
}

export default Header