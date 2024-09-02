import "dotenv/config"
import { isValidObjectId } from "mongoose"
import { userModel } from "../models/index.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const getCurrentUserProfileMiddleware = async (req, res) => {

    try {

        const userId = req?.currentUser?._id

        if (!userId || userId?.trim() === "") {
            return res.status(400).send({
                message: errorMessages?.idIsMissing
            })
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({
                message: errorMessages?.invalidId
            })
        }

        const user = await userModel?.findById(userId).exec()

        if (!user) {
            return res.status(400).send({
                message: errorMessages?.userNotFound
            })
        }

        const data = {
            userName: user?.userName,
            email: user?.email,
            profilePhoto: user?.profilePhoto,
            createdOn: user?.profilePhoto,
            isActive: user?.isActive,
            _id: user?._id
        }

        res.send({
            message: "profile fetched",
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const getUserProfileMiddleware = async (req, res) => {

    try {

        const { userId } = req?.params

        if (!userId || userId?.trim() === "") {
            return res.status(400).send({
                message: errorMessages?.idIsMissing
            })
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({
                message: errorMessages?.invalidId
            })
        }

        const user = await userModel?.findById(userId).exec()

        if (!user) {
            return res.status(400).send({
                message: errorMessages?.userNotFound
            })
        }

        const data = {
            userName: user?.userName,
            email: user?.email,
            profilePhoto: user?.profilePhoto,
            createdOn: user?.profilePhoto,
            isActive: user?.isActive,
            _id: user?._id
        }

        res.send({
            message: "profile fetched",
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const logoutMiddleware = async (req, res) => {

    try {

        res.clearCookie("hart")

        res.send({
            message: "logout successfull"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}