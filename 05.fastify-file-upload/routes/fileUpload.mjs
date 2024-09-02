import { fileUploadMiddleware } from "../middlewares/fileUpload.mjs"

async function fileRoutes(fastify, options) {

    fastify.post('/v1/file-upload', async (req, res) => {

        try {

            // middleware
            await fileUploadMiddleware(req, res)

        } catch (error) {
            console.error(error)
            return res.status(500).send({
                message: "internal server error",
                error: error?.message
            })
        }

    })

}

export default fileRoutes