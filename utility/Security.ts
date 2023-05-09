import { User } from "../types/types";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";



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

export function generateHashedPassword(password: string)
{
    return bcrypt.hashSync(password, 10);
}

export function comparePasswords(password: string, hashedPassword: string)
{
   return bcrypt.compareSync(password, hashedPassword)
}