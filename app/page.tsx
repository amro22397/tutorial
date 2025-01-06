import { getUser } from '@/actions/getUser'
import RedirectToLogin from '@/components/RedirectToLogin';
import { UserAuth } from '@/context/AuthContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

 const user = await getUser();

 console.log(user)

 
  if (!user._doc.email) {
    redirect('/login');
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
