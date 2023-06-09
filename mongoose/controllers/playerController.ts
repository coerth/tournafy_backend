import { Request, Response } from "express";
import PlayerModel from "../models/playerModel";
import catchAsync from "../../utility/CatchAsync";
import { verifyJWT } from "../../utility/Security";
import AppError from "../../utility/AppError";

export const getPlayers = catchAsync(async (req: Request, res: Response) => {

  
  let queryObj = req.query;
  const data = await PlayerModel.find(queryObj);
  res
    .status(200)
    .header({
      "Content-type": "application/json",
      "Content-length": data.length,
    })
    .json({
      status: "success",
      length: data.length,
      players: data,
    });

});

export const getPlayer = catchAsync(async (req: Request, res: Response) => {
  const data = await PlayerModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    player: data,
  });
});

export const updatePlayer = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  const decoded = verifyJWT(token)
  if(decoded?.role === "Admin" || decoded?.role === "API")
  {
  
  const player = PlayerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    player: player,
  });
}
throw new AppError("Not Authorized.", 401)
});

export const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  const decoded = verifyJWT(token)
  if(decoded?.role === "Admin" || decoded?.role === "API")
  {
  
  await PlayerModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Player Deleted",
  });

}
throw new AppError("Not Authorized.", 401)
});

export const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  const decoded = verifyJWT(token)
  if(decoded?.role === "Admin" || decoded?.role === "API")
  {
  
  const jsonData = req.body;

  const newPlayer = await PlayerModel.create(jsonData);

  res.status(201).json({
    status: "success",
    Player: newPlayer,
  });
}
throw new AppError("Not Authorized.", 401)
});
