import fastify from 'fastify'

const app = fastify()

app.get('/', (req, res) => res.send({ message: 'hello world' }))

const PORT = process.env.PORT || 5002

app.listen({ port: PORT }, () => console.log(`server is running on port ${PORT}`))