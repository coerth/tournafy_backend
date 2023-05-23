import { Request, Response } from "express";
import Match from "../models/matchModel";
import catchAsync from "../../utility/CatchAsync"
import { verifyJWT } from "../../utility/Security";
import AppError from "../../utility/AppError";

export const getMatches = catchAsync( async (req: Request, res: Response) => {

    let queryObj = req.query;
    console.log(queryObj)
    const data = await Match.find(queryObj)
    res.status(200)
    .header({
        "Content-type": "application/json",
        "Content-length": data.length,
    })
    .json({
        status: "success",
        length: data.length,
        matches: data
    })
});

export const getMatch = catchAsync( async (req: Request, res: Response) => {

    
    const data = await Match.findById(req.params.id)

    res.status(200)
            .json({
                status: "success",
                match: data
            })
});

export const updateMatch = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {

        
        const match = Match.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        
        res.status(200)
        .json({
            status: "success",
            match: match,
        })
    }
    throw new AppError("Not Authorized.", 401)
    
})

export const deleteMatch = catchAsync( async (req: Request, res: Response) => {

    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {


        await Match.findByIdAndDelete(req.params.id)


        res.status(204)
            .json({
                status: "success",
                message: "Match Deleted"
            })
        }
        throw new AppError("Not Authorized.", 401)
})

export const createMatch = catchAsync( async (req: Request, res: Response) => {

    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {

        const jsonData = req.body;
        
        const newMatch = await Match.create(jsonData)
    
        res.status(201)
            .json({
                status: "success",
                Match: newMatch
            })  
        }
    throw new AppError("Not Authorized.", 401)

})