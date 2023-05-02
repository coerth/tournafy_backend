import { Args, Match } from "../../types/types";
import MatchModel from '../../mongoose/models/matchModel'


export default {
    createMatch: async (_parent:never, { input }: Args) => {
        if('location' in input){
          let newMatch: Match = {
            location: input.location,
            winner: input.winner,
            score: input.score,
            stage: input.stage,
            teams: input.teams
          };
          let createdMatch = await MatchModel.create(newMatch)
          return createdMatch;
        } else {
          return null;
        }
      },
      deleteMatch: async (_parent:never, { id }:Args) => {
        let deletedMatch = await MatchModel.findByIdAndDelete(id)
        if (deletedMatch === null) {
          return false; 
        }
        return true;
    },
    updateMatch: async (_parent: never, { id, input }:Args) => {
        if('captain' in input){
        let match = await MatchModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return match; 
        }
    }

}