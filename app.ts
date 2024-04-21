import express, { type Express } from "express"
import "module-alias/register"
import dotenv from "dotenv"
import connectDB from "./configs/dbConn"

import postRouter from "./src/routes/post"
import healthyCheckRouter from "./src/routes/healthy-check"

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

app.listen(port, () => { console.log(`Server running on port http://localhost:${port}`) })
