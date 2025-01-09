import { getSession, getUser } from '@/actions/getUser'
import EmailIsNotVerified from '@/components/EmailIsNotVerified';
import RedirectToLogin from '@/components/RedirectToLogin';
import { UserAuth } from '@/context/AuthContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

 const user = await getSession();

 console.log(user)

 
  /* if (!user) {
    redirect('/login');
  } */
 
  return (
    <div>
      <EmailIsNotVerified />
      <Link
      href="/signout" >
        Signout
      </Link>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default page
