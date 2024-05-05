import { Router, type RequestHandler } from "express"
import authController from "@/controllers/auth-controller"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

const router = Router()

router.post("/signup", asyncErrorHandler(authController.signUp) as RequestHandler)

router.post("/login", asyncErrorHandler(authController.login) as RequestHandler)

router.post("/resetPassword", asyncErrorHandler(authController.resetPassword) as RequestHandler)

export default router
