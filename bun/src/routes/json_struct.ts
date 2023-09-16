export default async function(req: Request): Promise<Response> {
  return new Response(JSON.stringify(await req.json()), { status: 200, headers: { "Content-Type": "application/json" } })
}
