import { Args, Team } from "../../types/types";
import TeamModel from '../../mongoose/models/teamModel'


export default {
    createTeam: async (_parent:never, { input }: Args) => {
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
      },
      deleteTeam: async (_parent:never, { id }:Args) => {
        let deletedTeam = await TeamModel.findByIdAndDelete(id)
        if (deletedTeam === null) {
          return false; 
        }
        return true;
    },
    updateTeam: async (_parent: never, { id, input }:Args) => {
        if('captain' in input){
        let team = await TeamModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return team; 
        }
    }

}