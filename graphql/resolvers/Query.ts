// import { books, categories } from '../data';
import PlayerModel from '../../mongoose/models/playerModel';
import TeamModel from "../../mongoose/models/teamModel"
import MatchModel from "../../mongoose/models/matchModel"
import {Args} from '../../types/types'

export default {
    players: async (_parent:never) => PlayerModel.find(),
    player: async  (_parent:never, { id }:Args) => PlayerModel.findById(id),
    teams: async (_parent:never) => TeamModel.find(),
    team: async  (_parent:never, { id }:Args) => TeamModel.findById(id),
    matches: async (_parent:never) => MatchModel.find(),
    match: async  (_parent:never, { id }:Args) => MatchModel.findById(id)
}