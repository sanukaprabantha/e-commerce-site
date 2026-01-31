import express from 'express';
import { createorder, getOrders } from '../controllers/orderController.js';
const orderRouter=express.Router();

orderRouter.post("/",createorder);
orderRouter.get("/",getOrders);
orderRouter.put("/status/:orderId",updateOrderStatus);
export default orderRouter;