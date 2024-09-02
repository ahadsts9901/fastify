import "./utils/mongodb.mjs"
import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"

import { chatRoutes, usersRoutes, authRoutes, profileRoutes } from "./routes/index.mjs"

const app = fastify()

// cookie parser
app.register(fastifyCookie)

// un-authenticated routes
app.register(authRoutes, { prefix: '/api' })

// authenticated routes
app.register(profileRoutes, { prefix: '/api' })
app.register(usersRoutes, { prefix: '/api' })
app.register(chatRoutes, { prefix: '/api' })

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))