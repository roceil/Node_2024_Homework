import { type NextFunction } from "express"

interface AppError extends Error {
  statusCode?: number
  isControlError?: boolean
}

const appErrorHandler = (statusCode: number, message: string, next: NextFunction): void => {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.isControlError = true
  next(error)
}

export default appErrorHandler
