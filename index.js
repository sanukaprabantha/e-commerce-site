import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app=express();
app.use(cors()); 
// function success()
// {
//    console.log("server is started");
// }

app.use(express.json());

app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")
        if(token != null){
            token = token.replace("Bearer ","")
            jwt.verify(token,process.env.JWT_SECRET,
                (err,decode)=>{
                    if(decode == null){
                        res.json(
                            {
                                message : "Invalide token please login again"
                            }
                        )
                        return
                    }else{
                        req.user = decode
                    }
                }
            )
        }
        next();

    }
)

const connectionstring=process.env.MONGO_URI;
mongoose.connect(connectionstring).then(
    ()=>{
        console.log("Database conected");
    }
).catch(
    ()=>{
        console.log("Database conection failed");
    }
)

app.use("/api/students",studentRouter)

app.use("/api/users",userRouter)

app.use("/api/product",productRouter)

app.use("/api/orders",orderRouter)

app.listen(5000,
    ()=>{
        console.log("server is started");
    }
);



