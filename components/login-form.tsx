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
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { CircularProgress } from "@mui/material"
import { UserAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [type, setType] = useState("password");

    // const { user, googleSignIn, logOut } = UserAuth();
    // console.log(user);

    const router = useRouter();
    
    
        const [formData, setFormData] = useState({
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


      /*    useEffect(() => {
            const checkAuthentication = async () => {
              await new Promise((resolve) => setTimeout(resolve, 50));
              setLoading(false);
            };
            checkAuthentication();
          }, [user]); */

          console.log(formData)

    const formStyles = `text-md`
    const iconClass = `absolute right-4 top-2 text-gray-500 cursor-pointer`


    const session = useSession();
    console.log(session)


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
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">

                <Input id="password" type={type}
                defaultValue={formData.password}
                onChange={handleChange}
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

                </div>

              <div className="flex flex-col gap-3">

              <Button type="submit" className="w-full">
                {loading ? <Loader2 /> : "Login"}
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


            <div className="mt-0 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Register
              </a>
            </div>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
