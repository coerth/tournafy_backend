import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express from "express";
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import {globalErrorHandler} from "../handlers/errorHandler"
import AppError from "../utility/AppError"
import playerRouter from '../mongoose/routes/playerRoute'
import teamRouter from '../mongoose/routes/teamRoute'
import matchRouter from '../mongoose/routes/matchRoute'
import tournamentRouter from '../mongoose/routes/TournamentRoute'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// The following 2 imports are for reliable shutdown of the server.
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import Query from '.././graphql/resolvers/Query';
import Mutation from '../graphql/resolvers/Mutation';
import typeDefs from '../graphql/graphql_schema';
import cors from 'cors'
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"
import {Jwt} from "jsonwebtoken"
import userRouter from '../mongoose/routes/userRoute';
import { MyContext } from '../types/types';

import cookieParser from 'cookie-parser' 
import { verifyJWT } from '../utility/Security';

//JWT THINGS


const app = express();

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}


const httpServer = http.createServer(app);
const server: ApolloServer = new ApolloServer<MyContext>({
  typeDefs: [
    typeDefs,
  ],
  resolvers: {
    Query,
    Mutation
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use('/graphql', 
cors<cors.CorsRequest>(),
express.json(),
expressMiddleware(server, {
  context: async ({ req, res}) => ({
   
    token: req.headers.authorization || "",
    user: verifyJWT(req.headers.authorization)

  })
}));

app.use(cors())
app.use(express.json()); // Body parser for JSON data

app.use("/api/v1/player", playerRouter)
app.use("/api/v1/team", teamRouter)
app.use("/api/v1/match", matchRouter)
app.use("/api/v1/tournament", tournamentRouter)
app.use("/api/v1/user", userRouter)


app.all("*", (req:Request, res:Response, next:NextFunction) => {
  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})


app.use(globalErrorHandler)

export default app