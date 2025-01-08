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
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
  

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

    const [type, setType] = useState("password");
    const [validation, setValidation] = useState(false);

    const [loading, setLoading] = useState(false);

    const session = useSession();
    console.log(session);


    const handleValidation = (value: string) => {
      const lower = new RegExp('(?=.*[a-z])')
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const special = new RegExp('(?=.*[!@#\$%\^&\*])');

      if (lower.test(value) && upper.test(value) && number.test(value) && special.test(value) ) {
        setValidation(true);
      } else {
        setValidation(false);
      }
      
    }



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

        if (password !== confirmPassword) {
          toast({
            variant: "destructive",
            title: "Passwords do not match",
          })
          return;
        }

        setLoading(true)

        try {
            const response = await axios.post("/api/reset-password", {
                token: params.token,
                password: password,
            })

            if (!response.data.success) {
              toast({
                variant: "destructive",
                title: response.data.message
            })
            }

            if (response.data.success) {
              toast({
                className: "bg-green-500 text-white",
                title: response.data.message
            })
            router.push('/login');
            }


        } catch (error) {
            console.log(error);
            toast({
                title: `${error}`,
            })
        }

        setLoading(false)
        setPassword("");
        setConfirmPassword("");
    }

    console.log(password, confirmPassword)

    const formStyles = `text-md`
    const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`

   /* useEffect(() => {
      if (session.status === "authenticated") {
        router.push('/');
      }
    }, [session.status, router]); */

  return (
    
<div className="h-[95vh] flex justify-center items-center">

<Card className="flex flex-col justify-center items-start w-[400px] mx-auto">
      <CardHeader>
      <CardTitle className='text-2xl'>Reset Password</CardTitle>
      <CardDescription className='text-gray-600'></CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            
            <div className="flex flex-col relative">
            <Input type={type} placeholder="Password"
      value={password}
      onChange={e => {
        setPassword(e.target.value);
        handleValidation(e.target.value)
      }}
      required
      className='placeholder-gray-700' />


{type === "password" && password ? (
  
  <span className={`${iconClass}`}
  onClick={() => setType("text")}
  >
    
    <EyeIcon className="w-5 h-5" />
  </span>

) : type === "text" && password && (

  <span className={`${iconClass}`}
  onClick={() => setType("password")}
  >
    <EyeOffIcon className="w-5 h-5" />
  </span>

)}

            </div>


            <div className={`${validation || password === "" ? "hidden" : "flex"} text-sm text-red-500`}>
    You need at least one lowercase and uppercase letter, number and special character <br/> (A-Z, a-z, 0-9 and !@#$%^&*)
    </div>



            <div className="flex flex-col space-y-1.5">
              <Input type={type} placeholder="Confirm Password"
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
      required
      className='placeholder-gray-700' />
            </div>

            <div className="flex flex-row justify-between w-full px-1 mt-2">
         
      <Button type="submit" disabled={error.length > 0}>
        {loading ? <Loader2 /> : "Submit"}
      </Button>
      
      <Link href={'/login'}
    className='text-sm hover:underline active:text-gray-600 mt-[11.5px]' >
    Back to sign in
    </Link>

      </div>

          </div>

          

        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center w-full">

      

{error && (
  <p className="text-sm text-red-500 mt-4">{error}</p>
)}



      </CardFooter>
    </Card>


</div>
    
    

  )
}

export default page
