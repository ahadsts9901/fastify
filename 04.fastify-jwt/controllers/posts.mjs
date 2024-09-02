import { getCurrentUserProfile } from "../middlewares/auth.mjs"
import { authMiddleware } from "../middlewares/main.mjs"
import { createPostMiddleware, deletePostMiddleware, getPostsMiddleware, updatePostMiddleware } from "../middlewares/posts.mjs"

export const getPostsController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getPostsMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const createPostsController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await createPostMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const updatePostsController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await updatePostMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const deletePostsController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await deletePostMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const getCurrentUserProfileController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getCurrentUserProfile(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}