import express from "express";
import {register, sign_in, verify } from "../controllers/userController"


const userRouter = express.Router()

userRouter.route("/auth/register").post(register)
userRouter.route("/auth/sign_in").post(sign_in)
userRouter.route("/auth/verify").post(verify)

export default userRouter
