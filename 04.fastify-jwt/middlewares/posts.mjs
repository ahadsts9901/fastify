import { isValidObjectId } from "mongoose"
import { postModel } from "../models/postModel.mjs"

export const getPostsMiddleware = async (req, res) => {

    try {

        const posts = await postModel.find({}).exec()

        return res.send({
            message: "posts fetched",
            data: posts
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const createPostMiddleware = async (req, res) => {

    try {

        const text = req?.body?.text
        const title = req?.body?.title

        if (!text || text?.trim() === "") {
            return res.status(400).send({
                message: "text is required"
            })
        }

        if (!title || title?.trim() === "") {
            return res.status(400).send({
                message: "title is required"
            })
        }

        const resp = await postModel.create({ title, text })

        return res.send({
            message: "post added",
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const updatePostMiddleware = async (req, res) => {

    try {

        const postId = req?.params?.postId
        const title = req?.body?.title
        const text = req?.body?.text

        if (!postId) {
            return res.status(400).send({
                message: "postId is required"
            });
        }

        if (!title || title?.trim() === "") {
            return res.status(400).send({
                message: "title is required"
            });
        }

        if (!text || text?.trim() === "") {
            return res.status(400).send({
                message: "text is required"
            });
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: "postId is invalid"
            });
        }

        const post = await postModel.findById(postId).exec()

        if (!post) {
            return res.status(404).send({
                message: "post not found"
            });
        }

        post.title = title
        post.text = text
        await post.save()

        return res.send({
            message: "post updated",
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        });
    }

}

export const deletePostMiddleware = async (req, res) => {

    try {

        const postId = req?.params?.postId

        if (!postId) {
            return res.status(400).send({
                message: "postId is required"
            })
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: "postId is invalid"
            });
        }

        const post = await postModel.findById(postId).exec()

        if (!post) {
            return res.status(404).send({
                message: "post not found"
            });
        }

        const resp = await postModel.findByIdAndDelete(postId)

        return res.send({
            message: "post deleted",
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}