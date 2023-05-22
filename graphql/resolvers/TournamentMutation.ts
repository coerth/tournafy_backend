import { Args, MatchInput, MyContext, Tournament, TournamentInput } from "../../types/types";
import TournamentModel from '../../mongoose/models/tournamentModel'
import MatchModel from "../../mongoose/models/matchModel"
import AppErr from "../../utility/AppError";

export default {
    createTournament: async (_parent:never, { input }: Args, {user}: MyContext) => {
      if(user?.role === "Admin")
        {

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
          let createdTournament: any = await TournamentModel.create(newTournament)
          return createdTournament;
        } else {
          return null;
        }
      }
      throw new AppErr("Not Authorized", 401)
      },
      deleteTournament: async (_parent:never, { id }:Args, {user}: MyContext) => {
        if(user?.role === "Admin")
        {

        let deletedTournament = await TournamentModel.findByIdAndDelete(id)
        if (deletedTournament === null) {
          return false; 
        }
        return true;
      }
      throw new AppErr("Not Authorized", 401)
    },
    updateTournament: async (_parent: never, { id, input }:Args, {user}: MyContext) => {
      if(user?.role === "Admin")
        {

        if('minTeams' in input){
        let tournament = await TournamentModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return tournament; 
        }
      }
      throw new AppErr("Not Authorized", 401)
    },
    generateMatches: async (_parent: never, { id}:Args, {user}: MyContext) => {
      if(user?.role === "Admin")
      {

      let tournament = await TournamentModel.findById(id)
      let teamAmount = 0
       
       teamAmount = tournament!.teams ? tournament!.teams.length : 0

        let matchAmount = 0
        let stagesNeeded = 0
        let matchesPerStage = []

       while(teamAmount > 1)
       {
        if(teamAmount === 0)
        {
          break
        }
         matchAmount =  Math.ceil(teamAmount / 2)
         teamAmount = teamAmount / 2
         matchesPerStage.push(matchAmount)
         stagesNeeded ++
       }
      
      let matchArray = [];

      let teamsLeft = tournament?.teams ? tournament?.teams : []

      for(let i = 0; i < stagesNeeded; i ++)
      {
        for (let j = 0; j < matchesPerStage[i]; j ++)
        {

          let matchInput : MatchInput;
          if(teamsLeft!.length >= 2)
          {
            matchInput = {
              stage: stagesNeeded - i,
              teams: [teamsLeft[0]._id.toString(), teamsLeft[1]._id.toString()]
            }
            teamsLeft.splice(0,2)
          }
          else if(teamsLeft!.length === 1)
          {
            matchInput = {
              stage: stagesNeeded - i,
              teams: [teamsLeft[0]._id.toString()]
            }
            teamsLeft.pop()
          }
          else{
            matchInput = {
              stage: stagesNeeded - i
            }
          }

          console.log(matchInput)

          matchArray.push(matchInput)
        }
      }

        
        let createdMatcharray: Array<string> = []

        for (const match of matchArray)
        {
          const createdMatch = await MatchModel.create(match)
          createdMatcharray.push(createdMatch._id.toString())
        }
 
        let input: TournamentInput = {
          matches: createdMatcharray,
          minTeams: tournament?.minTeams!
        }

        let updatedTournament = await TournamentModel.findByIdAndUpdate(id, input, {
          new:true,
          runValidators: true
      })
        return updatedTournament; 
      }

      throw new AppErr("Not Authorized", 401)

    },

      addTeamToTournament:  async (_parent: never, { id, input}:Args, {user}: MyContext) => {

        if(user?.role === "Admin")
        {
        
        if("teamID" in input)
        {

          
          let tournament = await TournamentModel.findById(id)
          
          let newTeamArray: Array<string> = []

          for( const team of tournament?.teams!)
          {
            newTeamArray.push(team._id.toString())
          }
          if(newTeamArray.includes(input.teamID))
          {
            throw new AppErr("Team already in tournament", 404)
          }
          newTeamArray.push(input.teamID)

          let tournamentInput: TournamentInput = {
            teams: newTeamArray,
            minTeams: 8
          }


          let updatedTournament = await TournamentModel.findByIdAndUpdate(id, tournamentInput, {
            new:true,
            runValidators: true
        })
          return updatedTournament; 
        }
        }

        throw new AppErr("Not Authorized", 401)
      }
      
    }




