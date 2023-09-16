import { Router , Request, Response } from "express"

const router = Router()

export default router.post("/json/copy", (req: Request, res: Response): void => {
  const copy = JSON.stringify(JSON.parse(JSON.stringify(req.body)))

  res.status(200).contentType("application/json").send(copy)
  return ;
})
