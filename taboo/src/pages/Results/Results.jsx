import { useOutletContext } from "react-router-dom";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

function getWinner(array) {
    let winner = array[0];
    for(const item of array) {
        if(item.points > winner.points) {
            winner = item;
        }
    }
    return winner;
}

export default function Results () {
    const {teams} = useOutletContext();
    const winner = getWinner(teams);
    const mvp = getWinner(winner.players);

    return (
    <div className="Results">
        <div className="Winner">
            <h1 className="VictoryMessage">{winner.name} won with {winner.points} points!</h1>
            <h2 className="MVP">{mvp.name} scored the most points for their team: {mvp.points}</h2>
        </div>
        <div className="PlayerStats">

        </div>
        <Scoreboard teams={teams} />
    </div>
    )
}