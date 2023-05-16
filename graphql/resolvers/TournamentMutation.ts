import { Args, MatchInput, Tournament, TournamentInput } from "../../types/types";
import TournamentModel from '../../mongoose/models/tournamentModel'
import MatchModel from "../../mongoose/models/matchModel"

export default {
    createTournament: async (_parent:never, { input }: Args) => {
        if('minTeams' in input){
          let newTournament: Tournament = {
            name: input.name ? input.name : "",
            startDate: input.startDate ? input.startDate : Date.now(),
            endDate: input.endDate ? input.endDate : Date.now(),
            tournamentType: input.tournamentType ? input.tournamentType : "Elimination",
            tournamentGame: input.tournamentGame ? input.tournamentGame : "Other",
            maxTeams: input.maxTeams ? input.maxTeams : 8,
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
    },
    generateMatches: async (_parent: never, { id}:Args) => {

      let tournament = await TournamentModel.findById(id)

      let matchArray;

        let finalMatch: MatchInput = {
          stage: 1
        }

        let semiFinalMatch1: MatchInput = {
          stage: 2
        }

        let semiFinalMatch2: MatchInput = {
          stage: 2
        }
        
        matchArray = [finalMatch, semiFinalMatch1, semiFinalMatch2]
        
        if(tournament?.teams)
       {
        for(let i = 0; i < tournament.teams.length; i = i + 2)
        {
          let quarterFinalMatch: MatchInput = {
            stage: 3,
            teams: [tournament.teams[i]._id.toString(), tournament.teams[i+1]._id.toString()]
          }
          matchArray.push(quarterFinalMatch)

        }
      }

        
        let createdMatcharray: Array<string> = []

        for (const Match of matchArray)
        {
          const createdMatch = await MatchModel.create(Match)
          createdMatcharray.push(createdMatch._id.toString())
        }
 
        let input: TournamentInput = {
          matches: createdMatcharray,
          minTeams: 2
        }

        let updatedTournament = await TournamentModel.findByIdAndUpdate(id, input, {
          new:true,
          runValidators: true
      })
        return updatedTournament; 
      }

        
    
    }




