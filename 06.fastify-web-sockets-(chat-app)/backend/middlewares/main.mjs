import "dotenv/config"
import jwt from "jsonwebtoken"
import { sessionInDays } from "../core.mjs"

export const issueJWTTokenMiddleware = async (req, res, next) => {

    try {

        const { tokenPayload } = req

        if (!tokenPayload) {
            return res.status(500).send({
                message: "internal server error",
                error: "token payload not provided"
            })
        }

        const hart = jwt.sign(tokenPayload, process.env.JWT_KEY, {
            expiresIn: `${sessionInDays}d`
        })

        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + sessionInDays * 24 * 60 * 60 * 1000)
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}

export const authMiddleware = async (req, res, next) => {

    try {

        const { hart } = req.cookies

        if (!hart || hart?.trim() === "") {
            return res.status(401).send({
                message: "unauthorized"
            })
        }

        const currentUser = jwt.verify(hart, process.env.JWT_KEY)

        req.currentUser = currentUser

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}