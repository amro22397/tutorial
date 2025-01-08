import { User } from "@/models/user";
import bcrypt from "bcrypt"
import mongoose from "mongoose";


export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const  { token, password } = await req.json();

    try {
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
         });

         if (!user) {
            return Response.json({
                message: "Invalid token",
                success: false,
            })
         }

         const hashedPassword = await bcrypt.hash(password, 12);

         await User.updateOne({ email: user.email }, { $set: {
            resetPasswordToken: null,
            resetPasswordExpires: null,
            password: hashedPassword,
         }})

         return Response.json({
            message: "Password reset successfully",
               success: true,
         })
    } catch (error) {
      console.log(error);
      return Response.json({
         message: "something went wrong",
            success: false,
      })
    }



}