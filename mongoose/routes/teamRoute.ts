import express from "express";
import {getTeams, getTeam, updateTeam ,deleteTeam, createTeam} from "../controllers/teamController"

const teamRouter = express.Router()

teamRouter.route("/").get(getTeams).post(createTeam)
teamRouter.route("/:id").get(getTeam).patch(updateTeam).delete(deleteTeam)

export default teamRouter
