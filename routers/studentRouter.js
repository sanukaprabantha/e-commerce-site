import express from "express";
import { createStudent, getStudent } from "../controllers/studentController.js";

const studentRouter=express.Router();

studentRouter.get("/",getStudent)

studentRouter.post("/",createStudent)

studentRouter.delete("/",()=>
{
    console.log("delete request into studentrouter")
})

studentRouter.put("/",()=>{
    console.log("put request into studentrouter")
})

export default studentRouter;