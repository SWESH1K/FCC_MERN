import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// API request to get all products
router.get("/", getProduct)

// API request to create a product
router.post("/", createProduct)

// API request to update a product
router.put("/:id", updateProduct)

// API request to delete a product
router.delete("/:id", deleteProduct)

export default router;