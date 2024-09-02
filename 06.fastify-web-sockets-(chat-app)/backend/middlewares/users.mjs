import "dotenv/config"
import { errorMessages } from "../utils/errorMessages.mjs"
import { userModel } from "../models/index.mjs"

export const getAllUsersMiddleware = async (req, res) => {

    try {

        const users = await userModel.find({}).sort({ _id: -1 }).exec()

        return res.send({
            message: "users fetched",
            data: users
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}