import { Player, User } from "../types/types";
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

export function signJWT(player: Player){
    if(player == null)
    {
        return null
    }
    
   return jwt.sign(
        { email: player.email, fullName: player.name, _id: player._id, role: player.role },
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

export async function hasAccess(role: string, token: any)
{
    const decode = jwt.verify(token, process.env.REACT_APP_TOKEN as jwt.Secret) as User

    if(decode.role === role)
    {
        return true
    }

    return false
}