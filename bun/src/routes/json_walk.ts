export default async function(req: Request): Promise<Response> {
  const walk = walkBody(await req.json())

  return new Response(JSON.stringify(walk), { status: 200, headers: { "Content-Type": "application/json" } })
}

function walkBody(body: any): any {
  if (Array.isArray(body)) {
    for (let key = 0; key < body.length; key++) {
      const value = body[key]
      if (typeof value === "object") {
        walkBody(value)
      } else if (typeof value === "number") {
        body[key] = value + 1
      }
    }
  } else if (typeof body === "object") {
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "object") {
        walkBody(value)
      } else if (typeof value === "number") {
        body[key] = value + 1
      }
    }
  }

  return body
}
