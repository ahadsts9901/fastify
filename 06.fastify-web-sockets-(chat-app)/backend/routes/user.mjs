import { getAllUsersController } from "../controllers/index.mjs"

async function usersRoutes(fastify, options) {

    fastify.get('/v1/users', getAllUsersController)

}

export default usersRoutes