import { User } from "../types/types";
import jwt from "jsonwebtoken"


export function verifyJWT(token: any) {
    if(token == null)
    {
        return null
    }
    
     const decode = jwt.verify(token, process.env.REACT_APP_TOKEN as jwt.Secret) as User

      return decode
} 

export function signJWT(user: User){
    if(user == null)
    {
        return null
    }
    
   return jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id, role: user.role },
        process.env.REACT_APP_TOKEN as jwt.Secret
      )
}