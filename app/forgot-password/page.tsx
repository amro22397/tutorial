import { getSession } from "@/actions/getUser";
import ForgetForm from "@/components/ForgetForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

    

    const session = await getSession();
      
        console.log(session);
      
      
          if (session?.user?.email) {
            redirect('/');
          }
        

  return (
    <ForgetForm />
  )
}

export default page
