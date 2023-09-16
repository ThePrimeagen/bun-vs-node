import { Elysia } from 'elysia'

const router = new Elysia()

router.post('/json/copy', async ({request}) => {
  const copy = JSON.stringify(JSON.parse(JSON.stringify(await request.json())))

  return new Response(copy, { status: 200, headers: { "Content-Type": "application/json" } })
})

export default router
