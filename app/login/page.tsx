import { getSession } from "@/actions/getUser";
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getSession();
  
    console.log(session);
  
  
      if (session?.user?.email) {
        redirect('/');
      }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
