import { Router, type RequestHandler } from "express"
import postController from "@/controllers/post-controller"
import { checkId } from "@/middlewares/checkRequest"

const router = Router()

router.get("/posts", postController.getPosts as RequestHandler)

router.post("/posts", postController.createPost as RequestHandler)

router.delete("/posts", postController.deleteAllPosts as RequestHandler)

router.delete("/post/:id", checkId, postController.deletePost as RequestHandler)

router.put("/posts/:id", checkId, postController.editPost as RequestHandler)

export default router
