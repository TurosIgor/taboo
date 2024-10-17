import TeamForm from "../../components/TeamForm/TeamForm"
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"
import "./Teams.css"

export default function Teams () {
    const { teams, dispatch } = useOutletContext();
    const navigate = useNavigate();
    const [started, setStarted] = useState(false)
    const isEmpty = team => team.players.length < 1;

    return(
        <div className="TeamManager">
            <div className="Teams" >
        <button type="button" className="Start" disabled={teams.some(isEmpty)} onClick={e => {
            setStarted(true)
            setTimeout(() => {
                navigate("/play/game")
            }, 1500)
            }}>Start</button>
            {teams.map(team => <TeamForm key={team.id} started={started} team={team} teams={teams} dispatch={dispatch} />)}
            </div>
        </div>
    )
}