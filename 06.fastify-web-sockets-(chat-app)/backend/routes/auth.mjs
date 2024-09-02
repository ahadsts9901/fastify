import { googleLoginController } from "../controllers/index.mjs"

async function authRoutes(fastify, options) {

    fastify.post('/v1/google-login', googleLoginController)

}

export default authRoutes