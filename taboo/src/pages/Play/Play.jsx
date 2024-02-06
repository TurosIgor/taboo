import { Outlet } from "react-router-dom";
import { useReducer } from "react";

export default function Play () {
    const initialTeams = [
        {id: "team-1", name: "Team 1", players:[{name: "Player 1", id:"player-1"}, {name: "Player 2", id:"player-2"}]},
        {id: "team-2", name: "Team 2", players:[{name: "Player 3", id:"player-3"}, {name: "Player 4", id:"player-4"}]}
    ]

    const teamReducer = (state, action) => {
        switch(action.type) {
            case "ADD_PLAYER":
                return state.map(team => {
                    if(team.id === action.teamId) {
                        return { ...team, players:[ ...team.players, action.player]};
                    } else {
                        return team;
                    }
                });
            case "REMOVE_PLAYER":
                return state.map(team => {
                    if(team.id === action.teamId) {
                        return { ...team, players: team.players.filter(player => player.id !== action.playerId)};
                    } else {
                        return team;
                    }
                });
            case "RENAME_TEAM":
                return state.map(team => {
                    if(team.id === action.teamId) {
                        return { ...team, name: action.name};
                    } else {
                        return team;
                    }
                });
            case "RENAME_PLAYER":
                return state.map(team => {
                    if(team.id === action.teamId) {
                        return { ...team, players: team.players.map(player => player.id === action.playerId ? { ...player, name: action.name } : player)}
                    } else {
                        return team;
                    }
                });
            default:
                return state;
        }
    }

    const [teams, dispatch] = useReducer(teamReducer, initialTeams)

    return(
        <Outlet context={{teams, dispatch}}/>
    )
}