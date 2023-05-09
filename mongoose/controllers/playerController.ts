import { Request, Response } from "express";
import PlayerModel from "../models/playerModel";
import catchAsync from "../../utility/CatchAsync";

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
  const player = PlayerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    player: player,
  });
});

export const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  await PlayerModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Player Deleted",
  });
});

export const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const jsonData = req.body;

  const newPlayer = await PlayerModel.create(jsonData);

  res.status(201).json({
    status: "success",
    Player: newPlayer,
  });
});
