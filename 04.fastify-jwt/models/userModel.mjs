import mongoose from "mongoose";
import { emailPattern } from "../core.mjs"

let userSchema = new mongoose.Schema({

    userName: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: true,
        match: emailPattern
    },
    password: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

});

userSchema.pre('save', function (next) {
    if (this.email) this.email = this.email.toLowerCase()
    next()
})

export const userModel = mongoose.model("users", userSchema)