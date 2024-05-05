import { type Request, type Response, type NextFunction } from "express"

interface AppError extends Error {
  statusCode: number
  isControlError: boolean
}

const globalErrorHandler = (error: AppError, req: Request, res: Response, _next: NextFunction): void => {
  console.error(error.stack)

  // 開發環境
  if (process.env.NODE_ENV === "dev") {
    // 自定義錯誤處理
    if (error.isControlError) {
      res.status(error.statusCode).json({
        message: error.message,
        error
      })
      return
    }

    // mongoose 錯誤處理
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "資料驗證錯誤！",
        error: error.message
      })
      return
    }

    res.status(500).json({
      message: "伺服器錯誤，請稍後再試！",
      error: error.message
    })
    return
  }

  // 正式環境
  if (error.name === "ValidationError") {
    res.status(400).json({
      message: "資料驗證錯誤！"
    })
    return
  }

  res.status(500).json({
    message: "伺服器錯誤，請稍後再試！"
  }
  )
}

export default globalErrorHandler
