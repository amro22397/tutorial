import { User } from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import mongoose from "mongoose";
import { getServerSession } from "next-auth"

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"



export const config = {
  providers: [], // rest of your config
} satisfies NextAuthOptions



/* export async function getSession() {
    return await getServerSession(authOptions);
  } */


  export function getSession(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, config)
  }

export async function getUser() {

    try {
        const session = await getSession();
        console.log(session);
        
  
        if (!session?.user?.email) {
          return null;
        }

        mongoose.connect(process.env.MONGO_URL as string);
        const currentUser = await User.findOne({email: session?.user?.email})
  
      if (!currentUser) {
          // mongoose.connect(process.env.MONGO_URL as string)
          const user = await User.create({ email: session?.user?.email  })
          return {
            ...user,
                createdAt: user.createdAt.toString(),
                updateAt: user.updatedAt.toString(),
          };
  
      } else {
        return {
          ...currentUser,
              createdAt: currentUser.createdAt.toString(),
              updateAt: currentUser.updatedAt.toString(),
        };
      }

    } catch (error) {
        
        console.log(error)
    }
}
