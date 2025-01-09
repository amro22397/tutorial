import { getSession } from '@/actions/getUser'
import { User } from '@/models/user';
import React from 'react'

const EmailIsNotVerified = async () => {

    const session = await getSession();
    console.log(session?.user?.email)

    const user = await User.findOne({ email: session?.user?.email });
    console.log(user)

  return (
    <>
    {!user?.isVerified && user !== null && (
            <div className='bg-red-500 text-white py-1 w-full
    flex justify-center text-lg '>
      Your account is not <span className='mx-1 underline'>verified</span> yet. 
      Please check your email for verification link and refresh the page.
    </div>
        )
    } 
    </>  
  )
}

export default EmailIsNotVerified
