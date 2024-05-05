import { Router, type RequestHandler } from "express"
import postController from "@/controllers/post-controller"

const router = Router()

router.get("/posts", postController.getPosts as RequestHandler)

router.post("/posts", postController.createPost as RequestHandler)

export default router
