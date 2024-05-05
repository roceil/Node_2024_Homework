import express, { type Express } from "express"
import "module-alias/register"
import dotenv from "dotenv"
import connectDB from "./configs/dbConn"
import globalErrorHandler from "@/utils/globalErrorHandler"

import postRouter from "@/routes/post"
import healthyCheckRouter from "@/routes/healthy-check"

dotenv.config({ path: ".env.local" })

const app: Express = express()
const port = process.env.PORT ?? 3000

/* 解析 Body */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Mongo DB */
void connectDB()

/* Router */
app.use("/api", postRouter)
app.use("/api", healthyCheckRouter)

/* Error Handler */
app.use(globalErrorHandler)

/* UnCaught Exception */
process.on("uncaughtException", (error: Error) => {
  console.error(error.stack)
  process.exit(1)
})

/* UnHandled Rejection */
process.on("unhandledRejection", (error: Error) => {
  console.error(error.stack)
  process.exit(1)
})

app.listen(port, () => { console.log(`Server running on port http://localhost:${port}`) })
