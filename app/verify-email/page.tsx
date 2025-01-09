'use client'

import { useRouter } from "next/router"
import VerifyPage from "./VerifyPage"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";

// import { headers } from "next/headers";
// import type { NextRequest } from "next/server";
// import crypto from "crypto"
// import mongoose from "mongoose";
// import { User } from "@/models/user";

const page = () => {

    // const pathname = req.nextUrl.pathname;
    //console.log(pathname);



  // const header = await headers();
// const pathname = header.get('referer')

// const verificationToken: any = pathname?.split('=')[1].split('&')[0];

// const userId = pathname?.split('=')[2];


const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const searchParams = useSearchParams();
    const verifyToken = searchParams?.get('verifyToken');
    const id = searchParams?.get('id');

    console.log(verifyToken, id)

    

        const verifyEmail = async () => {

            if (!verifyToken || !id) {
                return toast({
                    variant: "destructive",
                    title: "Invalid URL",
                })
            }
    
                setLoading(true);
    
                try {
                    const res = await axios.put("/api/verify-email", { verificationToken: verifyToken, userId: id });

                    if (!res.data.success) {
                        setError(res.data.message)
                    }

                    if (res.data.success) {
                        setVerified(true);
                    }
    
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                    setError(true);
                }

                setLoading(false);
            
        }

        useEffect(() => {
            verifyEmail();
        }, [verifyToken, id]);


        if (loading) {
            return <h1 className="flex justify-center items-center h-screen">
                <CircularProgress />
            </h1>
        }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {verified && (
          <Alert variant="default" className="mb-5">
            <div className="flex flex-row gap-[15px] items-center">
            <SquareCheckBig color="green" size={40} />
            <div className="flex flex-col justify-center">
            <AlertTitle className="text-2xl font-semibold">Email is verified!</AlertTitle>
            <AlertDescription className="text-lg">
              Your email has been verified successfully.
            </AlertDescription>
            </div>
            </div>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-5">
            <div className="flex flex-row gap-[14px] items-center">
            <CircleX color="red" size={40}/>
            <div className="flex flex-col justify-center">
            <AlertTitle className="text-2xl font-semibold">Email verification failed!</AlertTitle>
            <AlertDescription className="text-lg">
              {error}
            </AlertDescription>
            </div>
            </div>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default page
