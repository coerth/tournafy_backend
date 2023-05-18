import { Request, Response } from "express";

export type Player = {
  _id?: string;
  name: string;
  gamerTag: string;
  email: string;
  phone: number;
  role: string
};

export type Team = {
  _id?: string;
  name: string;
  captain: Player;
  players?: Player[];
};

export type Match = {
  _id?: string;
  location?: string;
  winner?: Team;
  score?: number[];
  stage: number;
  teams: Team[];
};

export type Tournament = {
  _id?: string;
  name: string;
  startDate: number;
  endDate: number;
  tournamentType: string;
  tournamentGame: string;
  maxTeams: number;
  minTeams: number;
  matches?: Match[];
  teams?: Team[];
};

export type User = {
  _id?: string;
  fullName: string;
  email: string;
  hash_password: string;
  role: string;
};

export type Args = {
  id: string;
  input: PlayerInput | TeamInput | MatchInput | TournamentInput | RegisterInput | AddTeamInput;
};

export type PlayerInput = {
  name?: string;
  gamerTag: string;
  email?: string;
  phone?: number;
};

export type TeamInput = {
  name?: string;
  captain: Player;
  players?: Player[];
};

export type MatchInput = {
  location?: string;
  winner?: Team;
  score?: number[];
  stage: number;
  teams?: string[];
};

export type TournamentInput = {
  name?: string;
  startDate?: number;
  endDate?: number;
  tournamentType?: string;
  tournamentGame?: string;
  maxTeams?: number;
  minTeams: number;
  matches?: string[];
  teams?: string[];
};

export type RegisterInput = {
  name: string;
  email: string;
  gamerTag: string;
  password: string;
  confirmPassword: string;
  phone: number;
};
export type AddTeamInput = {
  teamID: string
}

export type SignInInput = {
  email: string;
  password: string;
};

export type MyContext = {
  // You can optionally create a TS interface to set up types

  // for your contextValue

  authScope?: String;
  user?: User;
  token?: String;
};
