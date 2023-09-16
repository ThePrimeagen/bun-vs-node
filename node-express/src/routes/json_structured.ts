import { Router , Request, Response } from "express"

const router = Router()

export default router.post("/json/struct", (req: Request, res: Response): void => {
  const struct = JSON.stringify(structuredClone(req.body))

  res.status(200).contentType("application/json").send(struct)
  return ;
})
