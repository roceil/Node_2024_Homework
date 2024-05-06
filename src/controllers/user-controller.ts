import { type NextFunction, type Request, type Response } from "express"
import Auth from "@/models/auth-model"
import appErrorHandler from "@/utils/appErrorHandler"

/**
 * 取得所有使用者
 */
const getUsers = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const users = await Auth.find({}, { password: 0 })
  res.status(200).json({
    status: "success",
    message: "成功取得所有使用者",
    data: users
  })
}

/**
 * 取得單一使用者
 */
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userData = req.userData

  const user = await Auth.findOne({ account: userData.account }, { password: 0 })
  if (user === null) {
    appErrorHandler(404, "找不到使用者", next)
    return
  }
  res.status(200).json({
    status: "success",
    message: "成功取得使用者",
    data: user
  })
}

interface UpdateData {
  userName: string | undefined
  gender: string | undefined
}

/**
 * 更改使用者資料
 */
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userData = req.userData

  const { userName, gender } = req.body

  if (userName === undefined || gender === undefined) {
    res.status(201).json({
      status: "success",
      message: "無更新使用者資料"
    })
    return
  }

  // 取得該用戶資料
  const user = await Auth.findOne({ account: userData.account }, { password: 0 })

  // 如果 userName 或 gender 有值就更新，沒有就不更新
  const updateData: UpdateData = {
    userName: user?.userName,
    gender: user?.gender
  }

  if (userName !== undefined && userName !== "") {
    updateData.userName = userName
  }

  if (gender !== undefined && gender !== "") {
    updateData.gender = gender
  }

  // 更新使用者
  await Auth.updateOne({ account: userData.account }, updateData)

  res.status(200).json({
    status: "success",
    message: "成功更新使用者資料"
  })
}

const userController = {
  getUsers,
  getUserById,
  updateUser
}

export default userController
