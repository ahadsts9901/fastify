import { issueJWTTokenMiddleware, googleLoginMiddleware } from "../middlewares/index.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const googleLoginController = async (req, res) => {

    try {

        await googleLoginMiddleware(req, res)
        await issueJWTTokenMiddleware(req, res)
        res.send({ message: "signup successfull", data: req?.tokenPayload })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}