import fastify from "fastify"
import multipart from 'fastify-multipart'

import fileRoutes from "./routes/fileUpload.mjs"

const app = fastify()

// multipart form data middleware
app.register(multipart);

// routes
app.register(fileRoutes, { prefix: '/api' })

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server running on port ${PORT}`))