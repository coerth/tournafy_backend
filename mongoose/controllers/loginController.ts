import catchAsync from "../../utility/CatchAsync";
import { Request, Response} from "express";
import { Player } from "../../types/types";
import AppError from "../../utility/AppError"
import { comparePasswords, generateHashedPassword, verifyJWT, signJWT } from "../../utility/Security";
import PlayerModel from "../models/playerModel";


export const register = catchAsync(async (req: Request, res: Response) => {
  let newPlayer = new PlayerModel(req.body);
  newPlayer.hash_password =generateHashedPassword(req.body.password);
  newPlayer = await PlayerModel.create(newPlayer);
  newPlayer.hash_password = ""

  res.status(201).json({
    status: "success",
    User: newPlayer,
  });
});


 export const sign_in = catchAsync( async (req: Request, res: Response) => {
  let player = await PlayerModel.findOne({email: req.body.email});
  
  if(!player || !comparePasswords(req.body.password, player.hash_password? player.hash_password : ""))
  {
    throw new AppError("Authentication failed. Invalid user or password.", 401)
  }
  else{
    return res
    .status(200)
    .json({
      token: signJWT(
        {_id: player.get("id"),
        name: player.get("name"),
        email: player.get("email"),
        role: player.get("role")
      } as Player
      ),
    });
  }
  });
  
  export const verify = catchAsync( async (req: Request, res: Response) => {
    const token = req.headers.authorization

    return res
    .status(200)
    .json({
      player: verifyJWT(token)
    })
  })
/* 
export const loginRequired = function (req: Request, res: Response, next: NextFunction) {
 
  
  if(req.body.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

export const profile = function (req: Request, res: Response, next: NextFunction) {
  if (req.body.user) {
    res.send(req.body.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}; */
