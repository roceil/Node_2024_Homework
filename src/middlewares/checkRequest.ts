import { type Request, type Response, type NextFunction } from "express"

export const checkId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params

  if (id === undefined || id === null || id === "") {
    res.status(400).json({
      status: "error",
      message: "param 缺少 ID 資訊"
    })
  } else {
    req.id = id
    next()
  }
}
