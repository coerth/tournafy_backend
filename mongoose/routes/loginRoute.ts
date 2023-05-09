import express from "express";
import {register, sign_in, verify } from "../controllers/loginController"


const loginRouter = express.Router()

loginRouter.route("/auth/register").post(register)
loginRouter.route("/auth/sign_in").post(sign_in)
loginRouter.route("/auth/verify").post(verify)

export default loginRouter
