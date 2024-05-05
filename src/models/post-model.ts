import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID 為必填欄位"]
  },
  contents: {
    type: String,
    required: [true, "Contents 為必填欄位"]
  },
  imgUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
})

const Post = mongoose.model("Post", postSchema)
export default Post
