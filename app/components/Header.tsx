import React, { useState } from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import SettingProfile from './SettingProfile';
import { User } from '@prisma/client';

async function Header() {
    const currentUser  = await getCurrentUser();
    
    return (
        <>
            <div className='sticky top-0 flex flex-col justify-between md:flex-row items-center p-5 border border-b-teal-600'>
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

                <SettingProfile currentUser={currentUser as User}/>
            </div>
        </>
    )
}

export default Header