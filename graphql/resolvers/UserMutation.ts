import { Args, UserInput, MyContext } from "../../types/types";
import UserModel from '../../mongoose/models/userModel'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../utility/AppError"
import { BaseContext } from "@apollo/server";




export default {
    register: async (_parent:never, { input }: Args) => {

      

        if('fullName' in input){

        let newUser = new UserModel({email: input.email, fullName: input.fullName});
        newUser.hash_password = bcrypt.hashSync(input.password, 10);
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
  
            if(!user || !bcrypt.compareSync(input.password, user.hash_password? user.hash_password : ""))
            {
              throw new AppError("Authentication failed. Invalid user or password.", 401)
            }
            else{
              return {
                token: jwt.sign(
                  { email: user.email, fullName: user.fullName, _id: user._id },
                  "process.env.REACT_APP_TOKEN"
                ),
              };
            }
            }; 
    },

    login: async (_parent: never, { input }: Args) => {
      if('email' in input && "password" in input){
        let user = await UserModel.findOne({email: input.email});

        if(!user || !bcrypt.compareSync(input.password, user.hash_password? user.hash_password : ""))
        {
          throw new AppError("Authentication failed. Invalid user or password.", 401)
        }else{
          //session.update(user)
          return user
    }
  }
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
}

}