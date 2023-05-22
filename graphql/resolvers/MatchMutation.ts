import { Args, Match, MatchInput, MyContext } from "../../types/types";
import MatchModel from '../../mongoose/models/matchModel'
import AppErr from "../../utility/AppError";


export default {
    createMatch: async (_parent:never, { input }: Args, {user}: MyContext) => {
      if(user?.role === "Admin")
        {

        if('stage' in input){
          let newMatch: MatchInput = {
            location: input.location,
            winner: input.winner,
            score: input.score,
            stage: input.stage,
            teams: input.teams ? input.teams : []
          };
          let createdMatch = await MatchModel.create(newMatch)
          return createdMatch;
        } else {
          return null;
        }
      }
      throw new AppErr("Not Authorized", 401)
      },
      deleteMatch: async (_parent:never, { id }:Args, {user}: MyContext) => {
        if(user?.role === "Admin")
        {

        let deletedMatch = await MatchModel.findByIdAndDelete(id)
        if (deletedMatch === null) {
          return false; 
        }
        return true;
      }
      throw new AppErr("Not Authorized", 401)

    },
    updateMatch: async (_parent: never, { id, input }:Args, {user}: MyContext) => {
      if(user?.role === "Admin")
        {

        if('stage' in input){
        let match = await MatchModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return match; 
        }
    }
    throw new AppErr("Not Authorized", 401)
  }

}