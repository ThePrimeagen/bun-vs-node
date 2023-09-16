import { Elysia } from 'elysia'

const router = new Elysia()

router.get('/hello', (): Response => {
  return new Response("Hello World", { status: 200, headers: { "Content-Type": "text/plain" } })
})

export default router
