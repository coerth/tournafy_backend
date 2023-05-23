import { Request, Response } from "express";
import Team from "../models/teamModel";
import catchAsync from "../../utility/CatchAsync"
import AppError from "../../utility/AppError";
import { verifyJWT } from "../../utility/Security";

export const getTeams = catchAsync( async (req: Request, res: Response) => {

    let queryObj = req.query;
    console.log(queryObj)
    const data = await Team.find(queryObj)
    res.status(200)
    .header({
        "Content-type": "application/json",
        "Content-length": data.length,
    })
    .json({
        status: "success",
        length: data.length,
        teams: data
    })
});

export const getTeam = catchAsync( async (req: Request, res: Response) => {

    
    const data = await Team.findById(req.params.id)

    res.status(200)
            .json({
                status: "success",
                team: data
            })
});

export const updateTeam = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {


        const team = Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })


        res.status(200)
            .json({
                status: "success",
                team: team,
            })

        }
        throw new AppError("Not Authorized.", 401)
    
})

export const deleteTeam = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {
    

        await Team.findByIdAndDelete(req.params.id)


        res.status(204)
            .json({
                status: "success",
                team: "Team Deleted"
            })
        }
        throw new AppError("Not Authorized.", 401)
})

export const createTeam = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decoded = verifyJWT(token)
    if(decoded?.role === "Admin" || decoded?.role === "API")
    {
        const jsonData = req.body;
        
        const newTeam = await Team.create(jsonData)
    
        res.status(201)
            .json({
                status: "success",
                Team: newTeam
            })  
        }
        throw new AppError("Not Authorized.", 401)  
})