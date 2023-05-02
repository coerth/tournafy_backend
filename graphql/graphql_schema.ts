const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Player" type defines the queryable fields for every player in our data source.
  type Player {
    _id: ID!
    name: String!
    gamerTag: String!
    email: String!
    phone: Int 
  }
  
  type Team {
    _id: ID!
    name: String!
    captain: Player
    players: [Player]
  }

  type Match {
    _id: ID!
    location: String!
    date: String
    winner: Team
    score: [Int]
    stage: Int!
    teams: [Team!]!
  }

  type Tournament {
    _id: ID!
    startDate: String
    endDate: String
    tournamentType: String!
    maxTeams: Int!
    minTeams: Int!
    matches: [Match!]!
    teams: [Team]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # The "books" query accepts an optional "author" argument of type String. And returns a list always (even if it's empty). Never null. And content will allways be a Book object or empty. never null.
  type Query {
    players: [Player!]!
    player(id: ID!): Player!
    teams: [Team!]!
    team(id: ID!): Team!
    matches: [Match!]!
    match: Match!
    tournaments: [Tournament!]!
    tournament: Tournament!
  }

  type Mutation{
    createPlayer(input: PlayerInput!): Player
    deletePlayer(id: ID!): Boolean
    updatePlayer(id: ID!, input: PlayerInput!): Player
    createTeam(input: TeamInput!): Team
    deleteTeam(id: ID!): Boolean
    updateTeam(id: ID!, input: TeamInput!): Team
  }

  input PlayerInput {
    name: String
    gamerTag: String!
    email: String
    phone: Int
}

  input TeamInput {
  name: String,
  captain: ID!,
  players: [ID]
}

`;

export default typeDefs;