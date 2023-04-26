import { Request, Response } from "express";
import Team from "../models/teamModel";
import catchAsync from "../../utility/CatchAsync"

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


        const team = Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })


        res.status(200)
            .json({
                status: "success",
                team: team,
            })
    
})

export const deleteTeam = catchAsync( async (req: Request, res: Response) => {

    

        await Team.findByIdAndDelete(req.params.id)


        res.status(204)
            .json({
                status: "success",
                team: "Team Deleted"
            })
    
})

export const createTeam = catchAsync( async (req: Request, res: Response) => {

        const jsonData = req.body;
        
        const newTeam = await Team.create(jsonData)
    
        res.status(201)
            .json({
                status: "success",
                Team: newTeam
            })    
})