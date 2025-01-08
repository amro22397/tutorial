
import { model, models, Schema } from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    hashedPassword: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
    },

}, {timestamps: true})

export const User = models?.User || model("User", UserSchema)