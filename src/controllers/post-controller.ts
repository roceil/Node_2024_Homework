import { type Request, type Response } from "express"
import { convertTZ } from "@/lib"
import Post from "@/models/post-model"

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
const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
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
 * 刪除所有貼文
 */
const deleteAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    await Post.deleteMany()
    res.status(200).json(
      {
        status: "success",
        data: [],
        message: "成功刪除所有貼文"
      }
    )
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
 * 刪除一篇貼文
 * @param req.id - 要刪除的貼文 ID
 */
const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req

    const post = await Post.findById(id)

    if (post === null) {
      res.status(404).json({
        status: "error",
        message: "找不到該貼文",
        data: []
      })
      return
    }

    await Post.findByIdAndDelete(id)

    const resultData = await Post.find()

    res.status(200).json({
      status: "success",
      message: "成功刪除貼文",
      data: resultData
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
 * 編輯貼文
 * @param req.id - 要編輯的貼文 ID
 */
const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req
    const { content } = req.body as { content: string }

    const post = await Post.findById(id)

    if (post === null) {
      res.status(404).json({
        status: "error",
        message: "找不到該貼文",
        data: []
      })
      return
    }

    const resultData = await Post.findByIdAndUpdate(id, { content, updatedAt: new Date() }, { new: true })

    res.status(200).json({
      status: "success",
      message: "成功更新貼文",
      data: resultData
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

const postController = {
  getPosts,
  createPost,
  deleteAllPosts,
  deletePost,
  editPost
}

export default postController
