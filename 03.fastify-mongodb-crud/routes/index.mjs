import { createPostMiddleware, deletePostMiddleware, getPostsMiddleware, updatePostMiddleware } from "../middlewares/posts.mjs"

async function postRoutes(fastify, options) {

    fastify.get('/v1/posts', getPostsMiddleware)

    fastify.post('/v1/posts', createPostMiddleware)

    fastify.put('/v1/posts/:postId', updatePostMiddleware);

    fastify.delete('/v1/posts/:postId', deletePostMiddleware)

}

export default postRoutes