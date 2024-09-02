import { deleteMessageController, getMessagesController, sendMessageController } from "../controllers/index.mjs"

async function chatRoutes(fastify, options) {

    fastify.get('/v1/chats/:userId', getMessagesController)

    fastify.post('/v1/chats', sendMessageController)

    fastify.delete('/v1/chats/:messageId', deleteMessageController)

}

export default chatRoutes