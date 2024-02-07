import { Outlet } from "react-router-dom";
import { useReducer } from "react";

export default function Play() {
    const initialTeams = [
        { id: "team_1", points: 0, current: false, name: "Team 1", players: [{ name: "Player 1", current: false, id: "player_1" }, { name: "Player 2", current: false, id: "player_2" }] },
        { id: "team_2", points: 0, current: false, name: "Team 2", players: [{ name: "Player 3", current: false, id: "player_3" }, { name: "Player 4", current: false, id: "player_4" }] }
    ]

    const teamReducer = (state, action) => {
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
                        return { ...team, points: (team.points + action.points) }
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

    const [teams, dispatch] = useReducer(teamReducer, initialTeams)

    return (
        <Outlet context={{ teams, dispatch }} />
    )
}