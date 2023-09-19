export default async function(req: Request): Promise<Response> {
  const copy = JSON.stringify(JSON.parse(JSON.stringify(await req.json())))

  return new Response(copy, { status: 200, headers: { "Content-Type": "application/json" } })
}
