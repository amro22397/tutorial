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
import React, { useActionState, useState } from "react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { signIn } from "next-auth/react";
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react"
import { CircularProgress } from '@mui/material';
import { Register } from "@/actions/actions"
import { parseWithZod } from "@conform-to/zod"
import { loginSchema } from "@/lib/zodSchemas"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [password, setPassword] = useState("");

    const [type, setType] = useState("password");
    const [validation, setValidation] = useState(false);

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

  // const [lastResult, action] = useActionState(Register, undefined);



  /* const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  }) */


    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    console.log(formData.name.length)


    const handleSubmit = async (e: any) => {

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

          if (formData.name.length < 3) {
            toast({
              variant: "destructive",
              title: "User name cannot be less than 3 characters"
            })
            setLoading(false);
            return;
          } else if (formData.name.length > 25) {
            toast({
              variant: "destructive",
              title: "User name cannot be more than 25 characters"
            })
            setLoading(false);
            return;
          }


          if (formData.password.length < 6) {
            toast({
              variant: "destructive",
              title: "Password cannot be less than 6 characters"
            })
            setLoading(false);
            return;
          } else if (formData.password.length > 20) {
            toast({
              variant: "destructive",
              title: "Password cannot be more than 20 characters"
            })
            setLoading(false);
            return;
          }


    
    
    
          axios.post("/api/register", formData)
          .then(() => {
            toast({
              className: "bg-green-500 text-white",
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
    const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`


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
                <Label htmlFor="email" className={`${formStyles}`}>User name</Label>
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

                <div className="relative">

                <Input id="password" type={type} 
                defaultValue={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  handleValidation(e.target.value)
                }}
                required />
                
                {type === "password" && formData.password ? (
  
                <span className={`${iconClass}`}
                onClick={() => setType("text")}
                >
                  
                  <EyeIcon className="w-5 h-5" />
                </span>
  
              ) : type === "text" && formData.password && (
  
                <span className={`${iconClass}`}
                onClick={() => setType("password")}
                >
                  <EyeOffIcon className="w-5 h-5" />
                </span>
  
              )}

                </div>

                <div className={`${validation || formData.password === "" ? "hidden" : "flex"} text-sm text-red-500`}>
    You need at least one lowercase and uppercase letter, number and special character <br/> (A-Z, a-z, 0-9 and !@#$%^&*)
    </div>

              </div>

              

              <div className="grid gap-2">
                <Label htmlFor="email" className={`${formStyles}`}>Confirm password</Label>
                <Input
                  id="confirm-password"
                  type={type}
                  placeholder=""
                  defaultValue={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>


              <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                {loading ? <Loader2 /> : "Register"}
                </Button>
                
                <Button variant="outline" className="w-full"
                onClick={handleSignWithGoogle}
                type="button">
                  
                  {loadingGoogle ? <Loader2 /> : 
                  <>
                  
                  <Image 
                  src={'/Google_Icons-09-512.webp'}
                  width={24}
                  height={24}
                  alt="Google logo"
                  />
                  Continue With Google
                  </>
  }
  
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



