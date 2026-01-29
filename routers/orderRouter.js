import express from 'express';
import { createorder } from '../controllers/orderController.js';
const orderRouter=express.Router();

orderRouter.post("/",createorder);
export default orderRouter;