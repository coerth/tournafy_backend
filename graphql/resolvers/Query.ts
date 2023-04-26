// import { books, categories } from '../data';
import PlayerModel from '../../mongoose/models/playerModel';
import {Args} from '../../types/types'

export default {
    players: async (_parent:never) => PlayerModel.find(),
    player: async  (_parent:never, { id }:Args) => PlayerModel.findById(id)
}