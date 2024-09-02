import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: [true, "title is required"]
    },
    text: {
        type: String,
        maxlength: 1000,
        trim: true,
        required: [true, "text is required"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

});

export const postModel = mongoose.model("posts", postSchema)