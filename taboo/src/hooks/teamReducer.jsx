export const teamReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: [...team.players, action.player] };
                } else {
                    return team;
                }
            });
        case "REMOVE_PLAYER":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: team.players.filter(player => player.id !== action.playerId) };
                } else {
                    return team;
                }
            });
        case "RENAME_TEAM":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, name: action.name };
                } else {
                    return team;
                }
            });
        case "RENAME_PLAYER":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: team.players.map(player => player.id === action.playerId ? { ...player, name: action.name } : player) }
                } else {
                    return team;
                }
            });
        case "ADD_POINT":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, points: (team.points + action.points), scores: {...team.scores, [`round${action.round}`]: team.scores[`round${action.round}`] + action.points}, players: team.players.map(plyr => plyr.current ? { ...plyr, points: plyr.points + action.points} : plyr) }
                } else {
                    return team;
                }
            });
        case "CHOOSE_TEAM":
            return state.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, current: true, players: team.players.map(player => player.id === action.playerId ? {...player, current: true} : {...player, current: false}) }
                } else {
                    return { ...team, current: false, players: team.players.map(player => player ? {...player, current:false} : player) };
                }
            });
        default:
            return state;
    }
}