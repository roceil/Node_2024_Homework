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
  },
  gender: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
})

const Auth = mongoose.model("Auth", authSchema)

export default Auth
