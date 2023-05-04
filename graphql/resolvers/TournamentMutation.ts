import { Args, Tournament } from "../../types/types";
import TournamentModel from '../../mongoose/models/tournamentModel'


export default {
    createTournament: async (_parent:never, { input }: Args) => {
        if('minTeams' in input){
          let newTournament: Tournament = {
            name: input.name,
            startDate: input.startDate ? input.startDate : Date.now(),
            endDate: input.endDate ? input.endDate : Date.now(),
            tournamentType: input.tournamentType ? input.tournamentType : "Elimination",
            maxTeams: input.maxTeams,
            minTeams: input.minTeams,
          };
          let createdTournament = await TournamentModel.create(newTournament)
          return createdTournament;
        } else {
          return null;
        }
      },
      deleteTournament: async (_parent:never, { id }:Args) => {
        let deletedTournament = await TournamentModel.findByIdAndDelete(id)
        if (deletedTournament === null) {
          return false; 
        }
        return true;
    },
    updateTournament: async (_parent: never, { id, input }:Args) => {
        if('minTeams' in input){
        let tournament = await TournamentModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return tournament; 
        }
    }

}