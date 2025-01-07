'use client'

import { UserAuth } from '@/context/AuthContext';
import { signOut } from 'next-auth/react'
import React from 'react'

const page = () => {

  const { user, googleSignIn, logOut } = UserAuth();

  return (
    <div>
      <button onClick={ () => signOut({callbackUrl: '/login'}) }
       className="">
        Signout
      </button>
    </div>
  )
}

export default page
