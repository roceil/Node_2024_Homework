import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import appErrorHandler from "@/utils/appErrorHandler"
import { type UserData } from "@/types/express"

const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers

  // 檢查有無 Token
  if (authorization === undefined) {
    appErrorHandler(401, "UnAuthorization", next)
    return
  }

  // 檢查 Token 格式
  if (!authorization.startsWith("Bearer ") || authorization.split(" ").length < 2) {
    appErrorHandler(422, "Token 格式不正確", next)
    return
  }

  // 解密 Token 時過濾 Bearer
  const token = authorization.split(" ")[1]
  const salt = process.env.JWT_SECRET as jwt.Secret
  const decodedObj = jwt.verify(token, salt) as UserData

  req.userData = decodedObj

  next()
}

export default isAuth
