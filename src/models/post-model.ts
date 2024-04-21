import mongoose from "mongoose"

/**
 * 驗證文章標籤是否有至少一個
 * @param {string[]} tags - 文章標籤陣列
 */
const validateTags = (tags: string[]): boolean => {
  return tags.length > 0
}

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name 為必填欄位"]
  },
  tags: {
    type: [String],
    required: [true, "Tags 為必填欄位"],
    validate: {
      validator: validateTags,
      message: "至少需要一個 tag"
    }
  },
  type: {
    type: String,
    required: [true, "Type 為必填欄位"]
  },
  image: {
    type: String,
    required: [true, "Image 為必填欄位"]
  },
  content: {
    type: String,
    required: [true, "Content 為必填欄位"]
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
})

const Post = mongoose.model("Post", postSchema)
export default Post
