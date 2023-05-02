import PlayerMutation from './PlayerMutation'
import TeamMutation from './TeamMutation'
import MatchMutation from './MatchMutation'
import TournamentMutation from './TournamentMutation'

export default {
    createPlayer: PlayerMutation.createPlayer,
    deletePlayer: PlayerMutation.deletePlayer,
    updatePlayer: PlayerMutation.updatePlayer,
    createTeam: TeamMutation.createTeam,
    deleteTeam: TeamMutation.deleteTeam,
    updateTeam: TeamMutation.updateTeam,
    createMatch: MatchMutation.createMatch,
    deleteMatch: MatchMutation.deleteMatch,
    updateMatch: MatchMutation.updateMatch,
    createTournament: TournamentMutation.createTournament,
    deleteTournament: TournamentMutation.deleteTournament,
    updateTournament: TournamentMutation.updateTournament
}