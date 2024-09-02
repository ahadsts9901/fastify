import { authMiddleware, createChatMiddleware, deleteChatMiddleware, getChatsMiddleware } from "../middlewares/index.mjs"
import { errorMessages } from "../utils/errorMessages.mjs"

export const getMessagesController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await getChatsMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}

export const sendMessageController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await createChatMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}

export const deleteMessageController = async (req, res) => {

    try {

        await authMiddleware(req, res)
        await deleteChatMiddleware(req, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: errorMessages.serverError,
            error: error?.message
        })
    }

}