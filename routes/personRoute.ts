import express = require("express");
import {getPeople, getPerson, updatePerson ,deletePerson, createPerson} from "../controllers/personController"

const personRouter = express.Router()

personRouter.route("/").get(getPeople).post(createPerson)
personRouter.route("/:id").get(getPerson).patch(updatePerson).delete(deletePerson)

export default personRouter
