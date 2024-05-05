import { type Request, type Response, type NextFunction } from "express"

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

const asyncErrorHandler = (func: AsyncFunction) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    func(req, res, next).catch(next)
  }
}

export default asyncErrorHandler
