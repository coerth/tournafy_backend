// <reference path="../types/express.d.ts"/>

import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require("express");
import morgan = require('morgan');
var cors = require('cors')
import { Request, Response, NextFunction } from 'express';
import {globalErrorHandler} from "../handlers/errorHandler"
import AppError from "../utility/AppError"
import playerRouter from '../routes/playerRoute'
import teamRouter from '../routes/teamRoute'
import matchRouter from '../routes/matchRoute'
import tournamentRouter from '../routes/TournamentRoute'



const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(cors())
app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

app.use("/api/v1/player", playerRouter)
app.use("/api/v1/team", teamRouter)
app.use("/api/v1/match", matchRouter)
app.use("/api/v1/tournament", tournamentRouter)


app.all("*", (req:Request, res:Response, next:NextFunction) => {
  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})


app.use(globalErrorHandler)

export default app