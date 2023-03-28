import express = require("express");
import {getMechanics, getMechanic, updateMechanic ,deleteMechanic, createMechanic} from "../controllers/mechanicController"

const mechanicRouter = express.Router()

mechanicRouter.route("/").get(getMechanics).post(createMechanic)
mechanicRouter.route("/:id").get(getMechanic).patch(updateMechanic).delete(deleteMechanic)

export default mechanicRouter
