import express from "express";
import { blockOrUnblockUser, createUser, getAllUsers, getUser, googleLogin, loginUser } from "../controllers/userController.js";
   

const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.post("/login",loginUser);
userRouter.get("/me",getUser);
userRouter.post("/googlelogin",googleLogin)
userRouter.get("/allusers",getAllUsers)
userRouter.put("/block/:email",blockOrUnblockUser)

export default userRouter;