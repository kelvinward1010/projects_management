import Image from 'next/image'
import React from 'react'
import AuthForm from './components/AuthForm'

function Home() {
  return (
    <div
        className='
            flex
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
        '
    >
        <div
          className='
            absolute
            flex
            min-h-full
            top-0
            left-0
            w-full
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
        <div className="flex flex-wrap justify-center items-center gap-40">
            <Image
                height={500}
                width={700}
                className="w-auto"
                src={"/images/logo.png"}
                alt="Logo"
            />
            <div className='flex flex-col'>
              <h2
                  className="
                      mt-6
                      text-center
                      text-3xl
                      font-bold-400
                      tracking-tight
                      text-white
                  "
              >
                  Sign in to your account
              </h2>
              <AuthForm />
            </div>
        </div>
    </div>
  )
}

export default Home