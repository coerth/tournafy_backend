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




export const register = catchAsync(async (req: Request, res: Response) => {
  let newUser = new UserModel(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser = await UserModel.create(newUser);
  newUser.hash_password = ""

  res.status(201).json({
    status: "success",
    User: newUser,
  });
});

/* export const sign_in = function (req: Request, res: Response) {
 

  UserModel.findOne(
    {
      email: req.body.email,
    },
    function (err: Error, user: unknown) {
      if (err) throw err;
      if (!user || !User.comparePassword(req.body.password)) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, fullName: user.fullName, _id: user._id },
          process.env.REACT_APP_TOKEN
        ),
      });
    }
  );
};  */

 export const sign_in = catchAsync( async (req: Request, res: Response) => {
  let user = await UserModel.findOne({email: req.body.email});
  
  if(!user || !bcrypt.compareSync(req.body.password, user.hash_password? user.hash_password : ""))
  {
    throw new AppError("Authentication failed. Invalid user or password.", 401)
  }
  else{
    return res
    .status(200)
    .json({
      token: jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id },
        "process.env.REACT_APP_TOKEN"
      ),
    });
  }
  }); 

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
};
