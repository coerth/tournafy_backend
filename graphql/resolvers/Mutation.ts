import PlayerMutation from './PlayerMutation'
import TeamMutation from './TeamMutation'

export default {
    createPlayer: PlayerMutation.createPlayer,
    deletePlayer: PlayerMutation.deletePlayer,
    updatePlayer: PlayerMutation.updatePlayer,
    createTeam: TeamMutation.createTeam,
    deleteTeam: TeamMutation.deleteTeam,
    updateTeam: TeamMutation.updateTeam
}