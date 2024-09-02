import { createPostsController, deletePostsController, getCurrentUserProfileController, getPostsController, updatePostsController } from "../controllers/posts.mjs";

async function postRoutes(fastify, options) {

    fastify.get('/v1/posts', getPostsController)

    fastify.post('/v1/posts', createPostsController)

    fastify.put('/v1/posts/:postId', updatePostsController);

    fastify.delete('/v1/posts/:postId', deletePostsController)

    fastify.get('/v1/profile', getCurrentUserProfileController)

}

export default postRoutes