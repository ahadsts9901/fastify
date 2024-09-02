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
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

});

export const postModel = mongoose.model("posts", postSchema)