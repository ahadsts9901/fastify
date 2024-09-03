import "./utils/mongodb.mjs";
import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifySocket from "fastify-socket.io";

import { chatRoutes, usersRoutes, authRoutes, profileRoutes } from "./routes/index.mjs";
import { corsOptions, globalIoObject } from "./utils/core.mjs";

const app = fastify();

// cors
app.register(fastifyCors, corsOptions)

// fastify socket.io
app.register(fastifySocket, { cors: corsOptions })

// cookie parser
app.register(fastifyCookie);

// un-authenticated routes
app.register(authRoutes, { prefix: "/api" });

// authenticated routes
app.register(profileRoutes, { prefix: "/api" });
app.register(usersRoutes, { prefix: "/api" });
app.register(chatRoutes, { prefix: "/api" });

// access the socket.io instance via the fastify-socket.io plugin
app.ready((err) => {

    if (err) throw err;

    const io = app.io;
    globalIoObject.io = io;

    io.on("connection", (socket) => console.log(`new client connected with id: ${socket.id}`))

});

// start the server
const PORT = process.env.PORT || 5002;

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))