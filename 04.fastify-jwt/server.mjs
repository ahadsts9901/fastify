import "./mongodb.mjs"
import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"

import { postRoutes, authRoutes } from "./routes/index.mjs"
import { authMiddleware } from "./middlewares/main.mjs"

const app = fastify()

// cookie parser
app.register(fastifyCookie)

// un-authenticated routes
app.register(authRoutes, { prefix: '/api' })

// authenticated routes
app.register(postRoutes, { prefix: '/api' })

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))