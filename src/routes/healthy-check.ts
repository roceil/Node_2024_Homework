import { type Request, type Response, Router } from "express"

const router = Router() // 創建一個新的 Router 實例

router.get("/healthy-check", (req: Request, res: Response) => {
  res.send("Server is alive!")
})

export default router
