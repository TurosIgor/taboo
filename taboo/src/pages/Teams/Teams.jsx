import TeamForm from "../../components/TeamForm/TeamForm"
import { useOutletContext } from "react-router-dom"
import "./Teams.css"

export default function Teams () {
    const { teams, dispatch } = useOutletContext();

    return(
        <div className="TeamManager">
            <div className="Teams">
            {teams.map(team => <TeamForm key={team.id} team={team} teams={teams} dispatch={dispatch} />)}
            </div>
        <button type="button" className="Start">Start</button>
        </div>
    )
}