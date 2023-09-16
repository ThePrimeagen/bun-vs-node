import { Router , Request, Response } from "express"

const router = Router()

router.get("/hello", (_: Request, res: Response): void => {
  res.status(200).contentType("text/plain").send("Hello World!")
})

export default router
