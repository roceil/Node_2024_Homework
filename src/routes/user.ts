import { Router, type RequestHandler, type Handler } from "express"
import userController from "@/controllers/user-controller"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.get("/users", asyncErrorHandler(userController.getUsers) as RequestHandler)

router.get("/user", isAuth as Handler, asyncErrorHandler(userController.getUserById) as RequestHandler)

router.put("/user", isAuth as Handler, asyncErrorHandler(userController.updateUser) as RequestHandler)

export default router
