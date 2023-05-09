import { Args, UserInput, MyContext, User } from "../../types/types";
import UserModel from '../../mongoose/models/userModel'
import AppError from "../../utility/AppError"
import { BaseContext } from "@apollo/server";
import { verifyJWT, generateHashedPassword, comparePasswords, signJWT } from "../../utility/Security";
import { sign } from "crypto";





export default {
    register: async (_parent:never, { input }: Args) => {

      

        if('fullName' in input){

        let newUser = new UserModel({email: input.email, fullName: input.fullName});
        newUser.hash_password = generateHashedPassword(input.password)
        newUser = await UserModel.create(newUser);
        newUser.hash_password = ""
        return newUser;
        } else {
          return null;
        }
      },
      
    sign_in: async (_parent: never, { input }:Args) => {

        if('email' in input && "password" in input){
            let user = await UserModel.findOne({email: input.email});
  
            if(!user || !comparePasswords(input.password, user.hash_password? user.hash_password : ""))
            {
              throw new AppError("Authentication failed. Invalid user or password.", 401)
            }
            else{
              return {
                token: signJWT(
                  {_id: user.get("id"),
                  fullName: user.get("fullName"),
                  email: user.get("email"),
                  role: user.get("role")
                } as User
                ),
              };
            }
            }; 
    },

updateUser: async (_parent: never, { id, input }:Args, {user}: MyContext) => {
  if(user !=null && id == user._id )
  {
    if('fullName' in input){
      let updatedUser = await UserModel.findByIdAndUpdate(id, input, {
        new:true,
        runValidators: true
      })
      return updatedUser; 
    }
  }
  else
  {
    throw new AppError("Authentication failed. Invalid user", 401)
  }
}

}