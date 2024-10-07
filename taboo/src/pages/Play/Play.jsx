import { Outlet } from "react-router-dom";
import { useReducer, useState } from "react";
import { teamReducer } from "../../contexts/TeamContext/TeamContext";

function getTeamForm(rounds = 8) {
    const teamForm = {};

    for(let i = 1; i <= rounds; i++) {
        teamForm[`round${i}`] = 0;
    }

    return teamForm;
}

export default function Play() {
    const initialTeams = [
        { id: "team_1", points: 0, current: true, name: "Team 1", players: [{ name: "Player 1", current: true, id: "player_1" }, { name: "Player 2", current: false, id: "player_2" }] },
        { id: "team_2", points: 0, current: false, name: "Team 2", players: [{ name: "Player 3", current: false, id: "player_3" }, { name: "Player 4", current: false, id: "player_4" }] }
    ]
    const [teams, dispatch] = useReducer(teamReducer, initialTeams)
    const [scores, setScores] = useState({ team_1: getTeamForm(), team_2: getTeamForm() })

    return (
        <Outlet context={{ teams, dispatch, scores, setScores }} />
    )
}