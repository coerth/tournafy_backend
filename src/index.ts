// <reference path="../types/express.d.ts"/>

import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require("express");
import morgan = require('morgan');
import personRouter from '../routes/personRoute';
import mechanicRouter from "../routes/mechanicRoute"
import { Request, Response, NextFunction } from 'express';
import {globalErrorHandler} from "../handlers/errorHandler"
import AppError from "../utility/AppError"


const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

app.use("/api/v1/people", personRouter)
app.use("/api/v1/mechanic", mechanicRouter)

app.all("*", (req:Request, res:Response, next:NextFunction) => {
  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})


app.use(globalErrorHandler)

export default app