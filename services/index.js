import React from 'react'
import { signIn } from "next-auth/react"

export const logged_in = async () => {
    console.log(FormData)

    const { email, password } = FormData;
    
    const status = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
    });

  return status;
}


