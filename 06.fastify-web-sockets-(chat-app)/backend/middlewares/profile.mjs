import "dotenv/config"
import { isValidObjectId } from "mongoose"
import { userModel } from "../models/index.mjs"

export const getCurrentUserProfileMiddleware = async (req, res) => {

    try {

        const { currentUser } = req

        if (!currentUser) {
            return res.status(401).send({
                message: "unauthorized",
            })
        }

        const { _id } = currentUser

        if (!_id || !isValidObjectId(_id)) {
            return res.status(401).send({
                message: "unauthorized",
            })
        }

        const user = await userModel.findById(_id).exec()

        if (!user) {
            return res.status(404).send({
                message: "account not found",
            })
        }

        return res.send({
            message: "profile fetched",
            data: user
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const getUserProfileMiddleware = async (req, res) => {

    try {

        const { userId } = req?.params

        if (!userId) {
            return res.status(401).send({
                message: "unauthorized",
            })
        }


        if (!isValidObjectId(userId)) {
            return res.status(401).send({
                message: "unauthorized",
            })
        }

        const user = await userModel.findById(userId).exec()

        if (!user) {
            return res.status(404).send({
                message: "account not found",
            })
        }

        return res.send({
            message: "profile fetched",
            data: user
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const logoutMiddleware = async (req, res) => {

    try {

        res.clearCookie('hart')

        return res.send({
            message: "logout successfull",
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}