import Product from '../models/products.models.js'
import mongoose from 'mongoose'

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({}) // Finds all the products
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("Error in fetching all the products:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createProduct = async (req, res) => {
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
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params;
    const product = req.body;

    // If no product exists with the given id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Invalid product id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({success: true, message: "Product updates successfully", data: updatedProduct})
    } catch (error) {
        console.log("Failed to update product:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params; 

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: `Product deleted successfully.`})
    } catch (error) {
        console.log(`Product(id:${id}) not found!`)
        res.status(404).json({success: false, message: "Product not found!"})
    }
}