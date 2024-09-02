import { getCurrentUserProfileController, getUserProfileController, logoutController } from "../controllers/index.mjs"

async function profileRoutes(fastify, options) {

    fastify.get('/v1/profile', getCurrentUserProfileController)

    fastify.get('/v1/profile/:userId', getUserProfileController)

    fastify.post('/v1/logout', logoutController)

}

export default profileRoutes