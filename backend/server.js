import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Product from './models/products.models.js'

dotenv.config()

const app = express()

app.use(express.json()) // allows us to accept json data in req.body

app.get("/", (req, res) => {
    res.send("Server is ready!")
})

app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data

    // If there is any empty field
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all the fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        res.error("Error in creating product:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }

})

// console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
})