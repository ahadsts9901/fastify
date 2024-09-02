import { chatModel } from "../models/index.mjs"

export const getAllUsersMiddleware = async (req, res) => {

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