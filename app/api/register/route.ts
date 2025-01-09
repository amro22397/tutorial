import { User } from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { sendEmail } from "@/utils/sendEmail";
import sgMail from '@sendgrid/mail'
import { verificationEmailTemplate } from "@/utils/verificationEmailTemplate";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        hashedPassword
    })

    const verificationToken = user.getVerificationToken();
    await user.save();
    console.log(verificationToken);

    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?verifyToken=${verificationToken}&id=${user._id}`

    console.log(verificationLink)

    // await sendEmail(user?.email, "Email Verification", verificationLink);

    const message = verificationEmailTemplate(verificationLink);
    console.log(message)
    
    // Click here to verify your email: ${verificationLink}
        const msg = {
                        to : user?.email,
                        from: 'amroalmutasim22@gmail.com',
                        subject: "Email Verification",
                        html: message,
                    }
            
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            
                    sgMail
                    .send(msg)
                    .then(() => {
                        return Response.json("Verification email was sent");
                    })
                    .catch(async (error) => {
                        await User.updateOne({ email: email }, { $set: {
                            verifyToken: null,
                            verifyTokenExpires: null,
                        }})
                        
                        console.log(error)

                        return Response.json("Failed sending email. Try again", {
                            status: 400,
                        });
                    });
    

    return Response.json(user)

}