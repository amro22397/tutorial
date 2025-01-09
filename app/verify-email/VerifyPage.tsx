'use client'

import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


const VerifyPage = ({ verifiyToken, id }: { verifiyToken: string, id: string}) => {

    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    
        if (!verifiyToken || !id) {
            return toast({
                variant: "destructive",
                title: "Invalid URL",
            })
        }

            setLoading(true);

            try {
                const res = axios.post("/api/verify-email", { verifiyToken, id });

                if (!res.data.success) {
                    setError(res.data.message)
                } else {
                    setVerified(true);
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        

  return (
    <div>
      hello
    </div>
  )
}

export default VerifyPage
