import { Request, Response } from "express";
import Tournament from "../models/tournamentModel";
import catchAsync from "../../utility/CatchAsync"
import AppError from "../../utility/AppError";
import { verifyJWT } from "../../utility/Security";

export const getTournaments = catchAsync( async (req: Request, res: Response) => {

    let queryObj = req.query;
    console.log(queryObj)
    const data = await Tournament.find(queryObj)
    res.status(200)
    .header({
        "Content-type": "application/json",
        "Content-length": data.length,
    })
    .json({
        status: "success",
        length: data.length,
        tournaments: data
    })
});

export const getTournament = catchAsync( async (req: Request, res: Response) => {

    
    const data = await Tournament.findById(req.params.id)

    res.status(200)
            .json({
                status: "success",
                tournament: data
            })
});

export const updateTournament = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {

        const tournament = Tournament.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })


        res.status(200)
            .json({
                status: "success",
                tournament: tournament,
            })
        }
        throw new AppError("Not Authorized.", 401)
})

export const deleteTournament = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {

    

        await Tournament.findByIdAndDelete(req.params.id)


        res.status(204)
            .json({
                status: "success",
                message: "Tournament Deleted"
            })
        }
        throw new AppError("Not Authorized.", 401)
})

export const createTournament = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {
        const jsonData = req.body;
        
        const newTournament = await Tournament.create(jsonData)
    
        res.status(201)
            .json({
                status: "success",
                Tournament: newTournament
            })    
        }
        throw new AppError("Not Authorized.", 401)
})