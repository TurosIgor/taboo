import { useOutletContext } from "react-router-dom";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
import "./Results.css"

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
            <h1 className="VictoryMessage">Congratulations!</h1>
            <h1 className="VictoryMessage"><span className={`WinnerName${winner.id.slice(5)}`}>{winner.name}</span> won with {winner.points} points!</h1>
            <div className="Mvp">
                <h1 className="MvpText"><span className="MvpM">M</span><span className="MvpV">V</span><span className="MvpP">P</span></h1>
                <h2 className="MvpMessage"><span className={`MvpName${winner.id.slice(5)}`}>{mvp.name}</span> scored the most points for their team: {mvp.points}</h2>
            </div>
        </div>
        <div className="PlayerStats">

        </div>
        <Scoreboard teams={teams} />
    </div>
    )
}