import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import catchAsync from "../../utility/CatchAsync";
import { Request, Response, NextFunction } from "express";
import { User } from "../../types/types";
import { PassThrough } from "stream";
import * as dotenv from "dotenv"
import AppError from "../../utility/AppError"
import { comparePasswords, generateHashedPassword, verifyJWT, signJWT } from "../../utility/Security";




export const register = catchAsync(async (req: Request, res: Response) => {
  let newUser = new UserModel(req.body);
  newUser.hash_password =generateHashedPassword(req.body.password);
  newUser = await UserModel.create(newUser);
  newUser.hash_password = ""

  res.status(201).json({
    status: "success",
    User: newUser,
  });
});


 export const sign_in = catchAsync( async (req: Request, res: Response) => {
  let user = await UserModel.findOne({email: req.body.email});
  
  if(!user || !comparePasswords(req.body.password, user.hash_password? user.hash_password : ""))
  {
    throw new AppError("Authentication failed. Invalid user or password.", 401)
  }
  else{
    return res
    .status(200)
    .json({
      token: signJWT(
        {_id: user.get("id"),
        fullName: user.get("fullName"),
        email: user.get("email"),
        role: user.get("role")
      } as User
      ),
    });
  }
  });
  
  export const verify = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization

    return res
    .status(200)
    .json({
      user: verifyJWT(token)
    })
  })
/* 
export const loginRequired = function (req: Request, res: Response, next: NextFunction) {
 
  
  if(req.body.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

export const profile = function (req: Request, res: Response, next: NextFunction) {
  if (req.body.user) {
    res.send(req.body.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}; */
