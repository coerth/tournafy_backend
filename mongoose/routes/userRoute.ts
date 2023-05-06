import express from "express";
import {register, sign_in, loginRequired, profile } from "../controllers/userController"


const userRouter = express.Router()

userRouter.route("/task").post(loginRequired, profile)
userRouter.route("/auth/register").post(register)
userRouter.route("/auth/sign_in").post(sign_in)

export default userRouter
