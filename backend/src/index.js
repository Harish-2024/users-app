import express from "express"
import authRoutes from "./routes/user-routes.js"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.use("/api/user", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})