import moment from "moment-timezone"
import Post from "@/models/post-model"
import { type Request, type Response } from "express"

/**
 * 將日期轉換到特定時區
 * @param date - 日期對象或日期字符串
 * @param tzString - 時區字符串
 * @returns 轉換時區後的日期字符串
 */
const convertTZ = (date: Date | string, tzString: string): string => {
  return moment(date).tz(tzString).format()
}

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
    res.status(204).json(
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

const postController = {
  getPosts,
  createPost,
  deleteAllPosts
}

export default postController
