import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, "Account 為必填欄位"]
  },
  password: {
    type: String,
    required: [true, "Password 為必填欄位"]
  },
  userName: {
    type: String,
    required: [true, "UserName 為必填欄位"]
  }
}, {
  timestamps: true,
  versionKey: false
})

const Post = mongoose.model("Auth", authSchema)
export default Post
