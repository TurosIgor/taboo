function getTeamForm(rounds = 1) {
    const teamForm = {};

    for(let i = 1; i <= rounds; i++) {
        teamForm[`round${i}`] = 0;
    }

    return teamForm;
}

export const teamReducer = (teams, action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: [...team.players, action.player] };
                } else {
                    return team;
                }
            });
        case "REMOVE_PLAYER":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: team.players.filter(player => player.id !== action.playerId) };
                } else {
                    return team;
                }
            });
        case "RENAME_TEAM":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, name: action.name };
                } else {
                    return team;
                }
            });
        case "RENAME_PLAYER":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, players: team.players.map(player => player.id === action.playerId ? { ...player, name: action.name } : player) }
                } else {
                    return team;
                }
            });
        case "ADD_POINT":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, points: (team.points + action.points), scores: {...team.scores, [`round${action.round}`]: team.scores[`round${action.round}`] + action.points}, players: team.players.map(plyr => plyr.current ? { ...plyr, points: plyr.points + action.points} : plyr) }
                } else {
                    return team;
                }
            });
        case "CHOOSE_TEAM":
            return teams.map(team => {
                if (team.id === action.teamId) {
                    return { ...team, current: true, players: team.players.map(player => player.id === action.playerId ? {...player, current: true} : {...player, current: false}) }
                } else {
                    return { ...team, current: false, players: team.players.map(player => player ? {...player, current:false} : player) };
                }
            });
        case "RESET_SCORES":
            return teams.map(team => {
                return {...team, scores: getTeamForm(), points: 0, players: team.players.map(player => {
                    return {...player, points: 0}
                })}
            })
        default:
            return teams;
    }
}