import fastify from "fastify"

import postRoutes from "./routes/index.mjs"

const app = fastify()

app.register(postRoutes, { prefix: '/api' })

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))