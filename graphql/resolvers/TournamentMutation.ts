import { Args, Tournament } from "../../types/types";
import TournamentModel from '../../mongoose/models/tournamentModel'


export default {
    createTournament: async (_parent:never, { input }: Args) => {
        if('tournamentType' in input){
          let newTournament: Tournament = {
            startDate: input.startDate,
            endDate: input.endDate,
            tournamentType: input.tournamentType,
            maxTeams: input.maxTeams,
            minTeams: input.minTeams,
            matches: input.matches,
            teams: input.teams
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
        if('tournamentType' in input){
        let tournament = await TournamentModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return tournament; 
        }
    }

}