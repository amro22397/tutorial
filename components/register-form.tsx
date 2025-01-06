'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import React, { useState } from "react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { signIn } from "next-auth/react";
import { Loader, Loader2 } from "lucide-react"
import { CircularProgress } from '@mui/material';

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSignWithGoogle = async (e: any) => {
        e.preventDefault();

        setLoadingGoogle(true);

        await signIn('google', {callbackUrl: '/'})

        setLoadingGoogle(false)
        
    }


    const handleSubmit = (e: any) => {

        e.preventDefault();

      setLoading(true);
      if (formData.password !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
        })
        setLoading(false);
        return;
      }



      axios.post("/api/register", formData)
      .then(() => {
        toast({
          title: "Account created successfully",
        });

        signIn('credentials', {...formData, callbackUrl: '/'});
      })
      .then((callback: any) => {
        if (callback?.ok) {
          toast({
            title: "Logged in successfully"
          })
        }

        if (callback?.error) {
          toast({
            title: `There is an error: ${callback?.error}`,
          })
        }
      }).catch((error) => {
        toast({
          title: "Something went wrong",
        })
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })

    }

    const formStyles = `text-md`

    console.log(formData)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-1">
                <Label htmlFor="name" className={`${formStyles}`}>User name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder=""
                  defaultValue={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className={`${formStyles}`}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
              <Label htmlFor="password" className={`${formStyles}`}>Password</Label>
                <Input id="password" type="password" 
                defaultValue={formData.password}
                onChange={handleChange}
                required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className={`${formStyles}`}>Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder=""
                  defaultValue={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              


              <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
              {loading ? <CircularProgress color="secondary" /> : "Register"}
              </Button>

              <Button variant="outline" className="w-full"
              onClick={handleSignWithGoogle}
              type="button">
                <Image 
                src={'/Google_Icons-09-512.webp'}
                width={24}
                height={24}
                alt="Google logo"
                />
                {loadingGoogle ? <CircularProgress color="secondary" /> : "Continue with Google"}
              </Button>
              </div>


            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Sign In
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
