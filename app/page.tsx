import { getUser } from '@/actions/getUser'
import RedirectToLogin from '@/components/RedirectToLogin';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const page = async () => {

  const user = await getUser();

  if (!user) {
    return (
      <>
      <div className=""></div>
      <RedirectToLogin />
      </>
      
    )
  }
  return (
    <div>
      
      <Link
      href="/signout" >
        Signout
      </Link>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default page
