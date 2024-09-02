import "dotenv/config"
import jwt from "jsonwebtoken"
import { sessionInDays } from "../utils/core.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const issueJWTTokenMiddleware = async (req, res, next) => {

    try {

        const { loginTokenPayload } = req

        if (!loginTokenPayload) {
            return res.status(400).send({
                message: errorMessages.noTokenPayload
            })
        }

        const hart = jwt?.sign(loginTokenPayload, process.env.JWT_KEY, { expiresIn: `${sessionInDays}d` })

        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + sessionInDays * 24 * 60 * 60 * 1000)
        });

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}

export const authMiddleware = async (req, res, next) => {

    try {

        const { hart } = req?.cookies

        if (!hart) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        const currentUser = jwt?.verify(hart, process.env.JWT_KEY)

        if (!currentUser) {
            return res.status(401).send({
                message: errorMessages?.unAuthError
            })
        }

        req.currentUser = currentUser

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: errorMessages?.serverError,
            error: error?.message
        })
    }

}