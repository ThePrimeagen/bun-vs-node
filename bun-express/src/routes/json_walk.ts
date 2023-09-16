import { Router , Request, Response } from "express"

const router = Router()

export default router.post("/json/walk", (req: Request, res: Response): void => {
  const walked = JSON.stringify(walkBody(req.body))

  res.status(200).contentType("application/json").send(walked)
  return ;
})

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
