import { Args, MyContext, Player } from "../../types/types";
import PlayerModel from '../../mongoose/models/playerModel'
import AppErr from "../../utility/AppError";


export default {
    /* createPlayer: async (_parent:never, { input }: Args) => {
        if('gamerTag' in input){
          let newPlayer: Player = {
            name: input.name ? input.name: "",
            gamerTag: input.gamerTag,
            email: input.email ? input.email: "",
            phone: input.phone ? input.phone: 0
          };
          let createdPlayer = await PlayerModel.create(newPlayer)
          return createdPlayer;
        } else {
          return null;
        }
      }, */
      deletePlayer: async (_parent:never, { id }:Args, {user}:MyContext) => {
        if(user?.role === "Admin")
        {


        let deletedPlayer = await PlayerModel.findByIdAndDelete(id)
        if (deletedPlayer === null) {
          return false; 
        }
        return true;
      }
      throw new AppErr("Not Authorized", 401)
    },
    updatePlayer: async (_parent: never, { id, input }:Args, {user}:MyContext) => {

      if(user?.role === "Admin")
      {

        if('gamerTag' in input){
        let player = await PlayerModel.findByIdAndUpdate(id, input, {
            new:true,
            runValidators: true
        })
          return player; 
        }
      }
      throw new AppErr("Not Authorized", 401)
    }
}