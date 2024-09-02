import { getAllUsersMiddleware, authMiddleware } from "../middlewares/index.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const getAllUsersController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getAllUsersMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}