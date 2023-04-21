import { Schema, model } from "mongoose";
import User from '../types/user'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
    },
    role: {
        type: String,
        required: true,
        enum: ['CUSTOMER', 'ADMIN']
    },
    customToken: {
        type: String
    }
})

export const UserModel = model<User>('User', userSchema)