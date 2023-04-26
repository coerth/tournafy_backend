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
    startDate: Date,
    endDate: Date,
    tournamentType: string,
    maxTeams: number,
    minTeams: number,
    matches: Match[],
    teams: Team[]
}


export type Args = {
    id: string;
    // input: PersonInput | Address | Mechanic;
};

// export type PersonInput = {
//     name: string,
//     age?: number,
//     address?: string
// }