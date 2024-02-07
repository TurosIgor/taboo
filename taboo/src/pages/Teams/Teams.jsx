import TeamForm from "../../components/TeamForm/TeamForm"
import { useOutletContext, useNavigate } from "react-router-dom"
import "./Teams.css"

export default function Teams () {
    const { teams, dispatch } = useOutletContext();
    const navigate = useNavigate();

    return(
        <div className="TeamManager">
            <div className="Teams">
            {teams.map(team => <TeamForm key={team.id} team={team} teams={teams} dispatch={dispatch} />)}
            </div>
        <button type="button" className="Start" onClick={e => navigate("/play/game")}>Start</button>
        </div>
    )
}