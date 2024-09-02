import { loginController, logoutController, signupController } from "../controllers/auth.mjs"

async function authRoutes(fastify, options) {

    fastify.post('/v1/signup', signupController)

    fastify.post('/v1/login', loginController)

    fastify.post('/v1/logout', logoutController)

}

export default authRoutes