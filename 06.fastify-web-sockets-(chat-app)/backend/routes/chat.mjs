import { deleteMessageController, getMessagesController, sendMessageController } from "../controllers/index.mjs"

async function chatRoutes(fastify, options) {

    fastify.get('/v1/messages/:userId', getMessagesController)

    fastify.post('/v1/message', sendMessageController)

    fastify.delete('/v1/message/:messageId', deleteMessageController)

}

export default chatRoutes