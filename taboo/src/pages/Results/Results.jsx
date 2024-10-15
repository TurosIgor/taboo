import { useOutletContext } from "react-router-dom";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

export default function Results () {
    const {teams} = useOutletContext()

    function getWinner() {
        return teams.find()
    }

    return (
    <div className="Results">
        <div className="Winner">
            <h1 className="VictoryMessage"></h1>
            <h2 className="MVP"></h2>
        </div>
        <div className="PlayerStats">

        </div>
        <Scoreboard teams={teams} />
    </div>
    )
}