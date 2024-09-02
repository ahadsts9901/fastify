import "./utils/mongodb.mjs"
import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors";
import { createServer } from "http"
import { Server as socketIo } from "socket.io"

import { chatRoutes, usersRoutes, authRoutes, profileRoutes } from "./routes/index.mjs"
import { allowedOrigins, globalIoObject } from "./utils/core.mjs";

const app = fastify()

// cors
app.register(fastifyCors, {
    origin: allowedOrigins,
    credentials: true,
});

// cookie parser
app.register(fastifyCookie)

// un-authenticated routes
app.register(authRoutes, { prefix: '/api' })

// authenticated routes
app.register(profileRoutes, { prefix: '/api' })
app.register(usersRoutes, { prefix: '/api' })
app.register(chatRoutes, { prefix: '/api' })

// socket io
const server = createServer(app.server)

const io = new socketIo(server, { cors: { origin: allowedOrigins, methods: "*" } })

globalIoObject.io = io

io.on("connection", (socket) => console.log(`new client connected with id: ${socket?.id}`))

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))