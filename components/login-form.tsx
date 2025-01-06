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
import { useState } from "react"
import { signIn } from "next-auth/react"
import { CircularProgress } from "@mui/material"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

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

        const handleSubmit = async (e: any) => {
            e.preventDefault();
            setLoading(true);
        
            await signIn('credentials', {...formData, callbackUrl: '/'});
            setLoading(false);
          }


    const formStyles = `text-md`
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password" className={`${formStyles}`}>Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password"
                defaultValue={formData.password}
                onChange={handleChange}
                required />
              </div>
              <Button type="submit" className="w-full">
                {loading ? <CircularProgress /> : "Login"}
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
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                {loading ? <CircularProgress color="secondary" /> : "Login"}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
