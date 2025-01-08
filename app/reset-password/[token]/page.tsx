'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
  

const page = ({ params }: any) => {

    const router = useRouter();

    console.log(params.token)
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const session = useSession();

    useEffect(() => {
      
      const verifyToken = async () => {

        try {
          const res = await axios.post("/api/verify-token", { token: params.token })
          
          if (res.data.status === false) {
            setError(res.data.message)
            setVerified(true)
          }

          if (res.data.status === true) {
            setError('')
            setVerified(true)
            setUser(res.data.user)
          }


        } catch (error) {
          
        }
      }

      verifyToken();
    }, [params.token]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true)

        try {
            const response = await axios.post("/api/reset-password", {
                
                password
            })
            setMessage(response.data.message);
            toast({
                title: response.data.message
            })
        } catch (error) {
            console.log(error);
            toast({
                title: `${error}`,
            })
        }

        setLoading(false)
    }


  return (
    
<div className="h-[95vh] flex justify-center items-center">

<Card className="flex flex-col justify-center items-start w-[400px] mx-auto">
      <CardHeader>
      <CardTitle className='text-2xl'>Reset Password</CardTitle>
      <CardDescription className='text-gray-600'></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            
            <div className="flex flex-col space-y-1.5">
            <Input type="password" placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
      className='placeholder-gray-700' />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Input type="password" placeholder="Confirm Password"
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
      required
      className='placeholder-gray-700' />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center w-full">

      <div className="flex flex-row justify-between w-full px-2">
         
      <Button type="submit" disabled={error.length > 0}>Submit</Button>
      
      <Link href={'/login'}
    className='text-sm hover:underline active:text-gray-600 mt-[11.5px]' >
    Back to sign in
    </Link>

      </div>

{error && (
  <p className="text-sm text-red-500 mt-4">{error}</p>
)}



      </CardFooter>
    </Card>


</div>
    
    

  )
}

export default page
