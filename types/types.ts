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


export type Args = {
    id: string;
    input: PlayerInput | TeamInput | MatchInput | TournamentInput;
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