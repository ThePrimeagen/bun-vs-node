export default function(_: Request): Response {
  return new Response('Hello World!', { status: 200, headers: { 'Content-Type': 'text/plain' } })
}
