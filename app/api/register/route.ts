import { User } from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        hashedPassword
    })

    return Response.json(user)

}