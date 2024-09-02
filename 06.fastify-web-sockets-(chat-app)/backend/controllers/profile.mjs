import { authMiddleware, getCurrentUserProfileMiddleware, getUserProfileMiddleware, logoutMiddleware } from "../middlewares/index.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const getCurrentUserProfileController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getCurrentUserProfileMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}

export const getUserProfileController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getUserProfileMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}

export const logoutController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await logoutMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}