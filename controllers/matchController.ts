import { Request, Response } from "express";
import Match from "../models/matchModel";
import catchAsync from "../utility/CatchAsync"

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


        const match = Match.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })


        res.status(200)
            .json({
                status: "success",
                match: match,
            })
    
})

export const deleteMatch = catchAsync( async (req: Request, res: Response) => {

    

        await Match.findByIdAndDelete(req.params.id)


        res.status(204)
            .json({
                status: "success",
                message: "Match Deleted"
            })
    
})

export const createMatch = catchAsync( async (req: Request, res: Response) => {

        const jsonData = req.body;
        
        const newMatch = await Match.create(jsonData)
    
        res.status(201)
            .json({
                status: "success",
                Match: newMatch
            })    
})