var posts = []

async function postRoutes(fastify, options) {

    fastify.get('/v1/posts', async (req, res) => {

        try {

            return res.send({
                message: "posts fetched",
                data: posts
            })

        } catch (error) {
            console.error(error)
            return res.status(500).send({
                message: "internal server error",
                error: error?.message
            })
        }

    })

    fastify.post('/v1/posts', async (req, res) => {

        try {

            const text = req?.body?.text
            const title = req?.body?.title

            if (!text || text?.trim() === "") {
                return res.status(400).send({
                    message: "text is required"
                })
            }

            if (!title || title?.trim() === "") {
                return res.status(400).send({
                    message: "title is required"
                })
            }

            posts.unshift({ id: posts?.length + 1, title: title, text: text })

            return res.send({
                message: "post added",
                data: posts
            })

        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "internal server error",
                error: error?.message
            })
        }

    })

    fastify.put('/v1/posts/:postId', async (req, res) => {

        try {

            const postId = req?.params?.postId
            const title = req?.body?.title
            const text = req?.body?.text

            if (!postId) {
                return res.status(400).send({
                    message: "postId is required"
                });
            }

            if (!title || title?.trim() === "") {
                return res.status(400).send({
                    message: "title is required"
                });
            }

            if (!text || text?.trim() === "") {
                return res.status(400).send({
                    message: "text is required"
                });
            }

            if (isNaN(+postId)) {
                return res.status(400).send({
                    message: "postId is invalid"
                });
            }

            const postIndex = posts.findIndex((post) => post.id == postId)

            if (postIndex === -1) {
                return res.status(404).send({
                    message: "post not found"
                });
            }

            posts[postIndex] = {
                ...posts[postIndex],
                title,
                text
            }

            return res.send({
                message: "Post updated",
                data: {
                    updatedPost: posts[postIndex],
                    allPosts: posts
                }
            })

        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Internal server error",
                error: error.message
            });
        }
    });

    fastify.delete('/v1/posts/:postId', async (req, res) => {

        try {

            const postId = req?.params?.postId

            if (!postId) {
                return res.status(400).send({
                    message: "postId is required"
                })
            }

            if (isNaN(Number(postId))) {
                return res.status(400).send({
                    message: "postId is invalid"
                })
            }

            posts = posts.filter((post) => post?.id !== +postId)

            return res.send({
                message: "post deleted",
                data: posts
            })

        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "internal server error",
                error: error?.message
            })
        }

    })

}

export default postRoutes