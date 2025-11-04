import express from "express";
import { createProduct, deleteProduct, getProduct, getProductId, updateProduct } from "../controllers/productController.js";

const productRouter=express.Router();

productRouter.get("/",getProduct);
productRouter.post("/",createProduct);
productRouter.delete("/:productId",deleteProduct);
productRouter.put("/:productId",updateProduct);
productRouter.get("/:productId",getProductId);
export default productRouter;