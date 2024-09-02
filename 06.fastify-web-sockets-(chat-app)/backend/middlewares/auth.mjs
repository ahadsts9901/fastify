import "dotenv/config"
import { userModel } from "../models/index.mjs"

export const googleLoginMiddleware = async (req, res, next) => {

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