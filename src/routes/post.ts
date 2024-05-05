import { Router, type RequestHandler } from "express"
import postController from "@/controllers/post-controller"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

const router = Router()

router.get("/posts", asyncErrorHandler(postController.getPosts) as RequestHandler)

router.post("/posts", asyncErrorHandler(postController.createPost) as RequestHandler)

export default router
