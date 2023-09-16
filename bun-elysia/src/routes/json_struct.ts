import { Elysia } from 'elysia'

const router = new Elysia()

router.post('/json/struct', async ({request}) => {
  return new Response(JSON.stringify(await request.json()), { status: 200, headers: { "Content-Type": "application/json" } })
})

export default router
