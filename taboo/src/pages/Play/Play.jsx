import { Outlet } from "react-router-dom";
import { useReducer } from "react";
import { teamReducer } from "../../hooks/teamReducer";

function getTeamForm(rounds = 8) {
    const teamForm = {};

    for(let i = 1; i <= rounds; i++) {
        teamForm[`round${i}`] = 0;
    }

    return teamForm;
}

export default function Play() {
    const initialTeams = [
        { id: "team_1", points: 0, current: true, name: "Team 1", scores: getTeamForm(), players: [{ name: "Player 1", current: true, id: "player_1", points: 0 }, { name: "Player 2", current: true, id: "player_2", points: 0 }] },
        { id: "team_2", points: 0, current: false, name: "Team 2", scores: getTeamForm(), players: [{ name: "Player 3", current: true, id: "player_3", points: 0 }, { name: "Player 4", current: true, id: "player_4", points: 0 }] }
    ]
    const [teams, dispatch] = useReducer(teamReducer, initialTeams)

    return (
        <Outlet context={{ teams, dispatch }} />
    )
}