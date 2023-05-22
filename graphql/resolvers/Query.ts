// import { books, categories } from '../data';
import PlayerModel from '../../mongoose/models/playerModel';
import TeamModel from "../../mongoose/models/teamModel"
import MatchModel from "../../mongoose/models/matchModel"
import TournamentModel from "../../mongoose/models/tournamentModel"
import {Args, MyContext} from '../../types/types'
import UserModel from '../../mongoose/models/userModel';
import { hasAccess } from '../../utility/Security';

export default {
    players: async (_parent:never) => PlayerModel.find(),
    player: async  (_parent:never, { id }:Args) => PlayerModel.findById(id),
    teams: async (_parent:never) => TeamModel.find(),
    team: async  (_parent:never, { id }:Args) => TeamModel.findById(id),
    matches: async (_parent:never) => MatchModel.find(),
    match: async  (_parent:never, { id }:Args) => MatchModel.findById(id),
    tournaments: async (_parent:never) => TournamentModel.find(),
    tournament: async  (_parent:never, { id }:Args) => TournamentModel.findById(id),
    admin_access: async (_parent:never,{ }:Args, {token}: MyContext) => hasAccess("Admin", token)
}