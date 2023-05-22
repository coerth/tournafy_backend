import { Args, MyContext, Team } from "../../types/types";
import TeamModel from '../../mongoose/models/teamModel'
import AppErr from "../../utility/AppError";


export default {
    createTeam: async (_parent:never, { input }: Args,  {user}: MyContext) => {
      if(user?.role === "Admin")
        {
        if('captain' in input){
          let newTeam: Team = {
            name: input.name ? input.name : "",
            captain: input.captain,
            players: input.players
          };
          let createdTeam = await TeamModel.create(newTeam)
          return createdTeam;
        } else {
          return null;
        }
      }

      throw new AppErr("Not Authorized", 401)
      },
      deleteTeam: async (_parent:never, { id }:Args, {user}: MyContext) => {

        if(user?.role === "Admin")
        {
          
          
          let deletedTeam = await TeamModel.findByIdAndDelete(id)
          if (deletedTeam === null) {
            return false; 
          }
          return true;
        }

        throw new AppErr("Not Authorized", 401)
    },
    updateTeam: async (_parent: never, { id, input }:Args, {user}: MyContext) => {
      if(user?.role === "Admin")
        {

        if('captain' in input){
        let team = await TeamModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return team; 
        }
      }
      throw new AppErr("Not Authorized", 401)
    }

}