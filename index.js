import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js";



const app=express();

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
            jwt.verify(token,"jwt-secret",
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

const connectionstring="mongodb+srv://admin:123@cluster0.bualhu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionstring).then(
    ()=>{
        console.log("Database conected");
    }
).catch(
    ()=>{
        console.log("Database conection failed");
    }
)

app.use("/students",studentRouter)

app.use("/users",userRouter)

app.use("/product",productRouter)

app.listen(5000,
    ()=>{
        console.log("server is started");
    }
);



