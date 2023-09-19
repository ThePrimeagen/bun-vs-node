import { Elysia } from 'elysia'

import helloRouter from './routes/hello'
import jsonCopyRouter from './routes/json_copy'
import jsonStructRouter from './routes/json_struct'
import jsonWalkRouter from './routes/json_walk'

const port = 8000
const app = new Elysia()

app.use(helloRouter)
app.use(jsonCopyRouter)
app.use(jsonStructRouter)
app.use(jsonWalkRouter)

app.get('*', (): Response => {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain" } })
}).listen(port)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
