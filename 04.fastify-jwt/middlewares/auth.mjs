import "dotenv/config"
import { isValidObjectId } from "mongoose"
import { userModel } from "../models/userModel.mjs"
import { emailPattern } from "../core.mjs"
import bcrypt from "bcrypt"

export const getCurrentUserProfile = async (req, res) => {

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

export const signupMiddleware = async (req, res, next) => {

    try {

        const { userName, password, email } = req?.body

        if (!userName || userName?.trim() === "") {
            return res.status(400).send({
                message: "userName is required"
            })
        }

        if (!password || password?.trim() === "") {
            return res.status(400).send({
                message: "password is required"
            })
        }

        if (!email || email?.trim() === "") {
            return res.status(400).send({
                message: "email is required"
            })
        }

        if (!emailPattern.test(email?.trim()?.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        const user = await userModel.findOne({ email: email?.toLowerCase() }).exec()

        if (user) {
            return res.status(400).send({
                message: "email already taken"
            })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const resp = await userModel.create({
            userName: userName,
            email: email?.toLowerCase(),
            password: passwordHash,
        })

        req.tokenPayload = {
            userName: resp?.userName,
            email: resp?.email,
            createdOn: resp?.createdOn,
            _id: resp?._id
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const loginMiddleware = async (req, res, next) => {

    try {

        const { password, email } = req?.body

        if (!password || password?.trim() === "") {
            return res.status(400).send({
                message: "password is required"
            })
        }

        if (!email || email?.trim() === "") {
            return res.status(400).send({
                message: "email is required"
            })
        }

        if (!emailPattern.test(email?.trim()?.toLowerCase())) {
            return res.status(401).send({
                message: "email or password incorrect"
            })
        }

        const user = await userModel.findOne({ email: email?.toLowerCase() }).exec()

        if (!user) {
            return res.status(401).send({
                message: "email or password incorrect"
            })
        }

        const isPasswordTrue = await bcrypt.compare(password, user?.password)

        if (!isPasswordTrue) {
            return res.status(401).send({
                message: "email or password incorrect"
            })
        }

        req.tokenPayload = {
            userName: user?.userName,
            email: user?.email,
            createdOn: user?.createdOn,
            _id: user?._id
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({
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