import express = require("express");
import {getMatches, getMatch, updateMatch ,deleteMatch, createMatch} from "../controllers/matchController"

const matchRouter = express.Router()

matchRouter.route("/").get(getMatches).post(createMatch)
matchRouter.route("/:id").get(getMatch).patch(updateMatch).delete(deleteMatch)

export default matchRouter
