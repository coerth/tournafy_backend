import express = require("express");
import {getPlayers, getPlayer, updatePlayer ,deletePlayer, createPlayer} from "../controllers/playerController"

const playerRouter = express.Router()

playerRouter.route("/").get(getPlayers).post(createPlayer)
playerRouter.route("/:id").get(getPlayer).patch(updatePlayer).delete(deletePlayer)

export default playerRouter
