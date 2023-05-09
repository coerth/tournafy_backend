import { Request, Response } from 'express';


export type Player = {
    _id?: string,
    name: string,
    gamerTag: string,
    email: string,
    phone: number
}

export type Team = {
    _id?: string,
    name: string,
    captain: Player,
    players?: Player[]
}

export type Match = {
    _id?: string,
    location: string,
    winner: Team,
    score: number[],
    stage: number
    teams: Team[]
}

export type Tournament = {
    _id?: string,
    name: string,
    startDate: number,
    endDate: number,
    tournamentType: string,
    maxTeams: number,
    minTeams: number,
    matches?: Match[],
    teams?: Team[]
}

export type User = {
    _id?: string,
    fullName: string,
    email: string,
    hash_password: string
}


export type Args = {
    id: string;
    input: PlayerInput | TeamInput | MatchInput | TournamentInput | UserInput;
};

export type PlayerInput = {
    name?: string,
    gamerTag: string,
    email?: string,
    phone?: number
}

export type TeamInput = {
    name?: string,
    captain: Player,
    players?: Player[]
}

export type MatchInput = {
    location: string,
    winner: Team,
    score: number[],
    stage: number
    teams: Team[]
}

export type TournamentInput = {
    name: string,
    startDate: number,
    endDate: number,
    tournamentType: string,
    maxTeams: number,
    minTeams: number,
    matches: Match[],
    teams: Team[]
}

export type UserInput = {
    fullName: string,
    email: string,
    password: string
}

export type SignInInput = {
    email: string,
    password: string
}

export class Session {
    request: Request;
    response: Response;
    userId: any;
    
    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
        this.userId = request.cookies.userId
    }

    update(user: any) {
        if(!user) {
            return;
        }

        const cookieOptions = {
            httpOnly: true,
        }

        this.response.cookie('userId', user._id?.toString(), cookieOptions)
    }

}

export type MyContext = {

    // You can optionally create a TS interface to set up types
  
    // for your contextValue
  
    authScope?: String,
    session: Session
   
  
  }