"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function Home() {
  return (
    <div>
        <button onClick={() => signOut()}>Get Out</button>
    </div>
  )
}

export default Home