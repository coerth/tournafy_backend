import express = require("express");
import {getTournaments, getTournament, updateTournament ,deleteTournament, createTournament} from "../controllers/tournamentController"

const tournamentRouter = express.Router()

tournamentRouter.route("/").get(getTournaments).post(createTournament)
tournamentRouter.route("/:id").get(getTournament).patch(updateTournament).delete(deleteTournament)

export default tournamentRouter
