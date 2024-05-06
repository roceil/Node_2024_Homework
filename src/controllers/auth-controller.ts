import { type NextFunction, type Request, type Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import Auth from "@/models/auth-model"
import appErrorHandler from "@/utils/appErrorHandler"

/**
 * 註冊
 */
const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { account, password, confirmPassword, userName } = req.body as { account: string, password: string, confirmPassword: string, userName: string }

  // 檢查必填欄位
  if (account === "" || password === "" || confirmPassword === "" || userName === "" || account === undefined || password === undefined || confirmPassword === undefined || userName === undefined) {
    appErrorHandler(400, "缺少 account 或 password 或 confirmPassword 或 userName", next)
    return
  }

  // 檢查密碼是否相同
  if (password !== confirmPassword) {
    appErrorHandler(400, "密碼與確認密碼不相同", next)
    return
  }

  // 檢查 Email 格式
  if (!validator.isEmail(account)) {
    appErrorHandler(400, "Email 格式不正確", next)
    return
  }

  // 檢查密碼長度
  if (password.length < 6) {
    appErrorHandler(400, "密碼長度不得小於 6", next)
    return
  }

  // 檢查信箱是否已被註冊
  const isAccountExist = await Auth.findOne({
    account
  })
  if (isAccountExist !== null) {
    appErrorHandler(400, "信箱已被註冊", next)
    return
  }

  // 密碼加密
  const hashPassword = await bcrypt.hash(password, 10)

  // JWT Token
  const salt = process.env.JWT_SECRET as jwt.Secret
  const token = jwt.sign({ account, userName }, salt, {
    expiresIn: "1d"
  })

  const auth = new Auth({ account, password: hashPassword, userName })
  await auth.save()
  res.status(201).json({
    status: "success",
    message: "成功註冊",
    data: {
      account,
      userName,
      token
    }
  })
}

/**
 * 登入
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { account, password } = req.body as { account: string, password: string }

  // 檢查必填欄位
  if (account === "" || password === "" || account === undefined || password === undefined) {
    appErrorHandler(400, "缺少 account 或 password", next)
    return
  }

  // 檢查 Email 格式
  if (!validator.isEmail(account)) {
    appErrorHandler(400, "Email 格式不正確", next)
    return
  }

  // 檢查信箱是否存在
  const auth = await Auth.findOne({
    account
  })
  if (auth === null) {
    appErrorHandler(400, "信箱不存在", next)
    return
  }

  // 檢查密碼是否正確
  const isPasswordCorrect = await bcrypt.compare(password, auth.password)
  if (!isPasswordCorrect) {
    appErrorHandler(400, "密碼錯誤", next)
    return
  }

  // JWT Token
  const salt = process.env.JWT_SECRET as jwt.Secret
  const token = jwt.sign({ account, userName: auth.userName }, salt, {
    expiresIn: "1d"
  })

  res.status(200).json({
    status: "success",
    message: "成功登入",
    data: {
      account,
      userName: auth.userName,
      token
    }
  })
}

/**
 * 重設密碼
 */
const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userData = req.userData

  const { newPassword, confirmNewPassword } = req.body as { newPassword: string, confirmNewPassword: string }

  // 檢查必填欄位
  if (newPassword === "" || confirmNewPassword === "" || newPassword === undefined || confirmNewPassword === undefined) {
    appErrorHandler(400, "缺少 newPassword 或 confirmNewPassword", next)
    return
  }

  // 檢查信箱是否存在
  const auth = await Auth.findOne({
    account: userData.account
  })

  // 檢查信箱是否存在
  if (auth === null) {
    appErrorHandler(400, "信箱不存在", next)
    return
  }

  // 檢查密碼是否相同
  if (newPassword !== confirmNewPassword) {
    appErrorHandler(400, "密碼與確認密碼不相同", next)
  }

  // 密碼加密
  const hashNewPassword = await bcrypt.hash(newPassword, 10)

  // 更新密碼
  await Auth.updateOne({ password: hashNewPassword })

  res.status(200).json({
    status: "success",
    message: "成功更新密碼"
  })
}

const authController = {
  signUp,
  login,
  resetPassword
}

export default authController
