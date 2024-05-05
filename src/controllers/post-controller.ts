import { type NextFunction, type Request, type Response } from "express"
import { convertTZ } from "@/lib"
import Post from "@/models/post-model"
import appErrorHandler from "@/utils/appErrorHandler"

/**
 * 獲取所有貼文
 */
const getPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
    const convertPosts = posts.map(post => {
      const postObject = post.toObject()
      return {
        ...postObject,
        createdAt: convertTZ(post.createdAt as Date, "Asia/Taipei"),
        updatedAt: convertTZ(post.updatedAt as Date, "Asia/Taipei")
      }
    })
    res.status(200).json({
      status: "success",
      message: "成功取得所有貼文",
      data: convertPosts
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        status: "error",
        data: [],
        message: error.message
      })
    } else {
      res.status(500).json({ message: "An unknown error occurred" })
    }
  }
}

/**
 * 新增一篇貼文
 */
const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, content } = req.body as { userId: string, content: string }

  // 明確檢查空字符串
  if (userId === "" || content === "" || userId === undefined || content === undefined) {
    appErrorHandler(400, "缺少 userId 和 content", next)
    return
  }

  const post = new Post(req.body)
  const postObject = post.toObject()
  const convertPost = {
    ...postObject,
    createdAt: convertTZ(post.createdAt as Date, "Asia/Taipei"),
    updatedAt: convertTZ(post.updatedAt as Date, "Asia/Taipei")
  }
  await post.save()
  res.status(201).json({
    status: "success",
    message: "成功新增一篇貼文",
    data: convertPost
  })
}

const postController = {
  getPosts,
  createPost
}

export default postController
