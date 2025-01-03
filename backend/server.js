import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import path from 'path'
import productRouter from './routes/product.route.js'

dotenv.config()

const __dirname = path.resolve()

const app = express()

app.use(express.json()) // allows us to accept json data in req.body

app.use("/api/products", productRouter)

if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
})