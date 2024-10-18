import { useOutletContext, useNavigate } from "react-router-dom";
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
    const {teams, dispatch} = useOutletContext();
    const winner = getWinner(teams);
    const mvp = getWinner(winner.players);
    const navigate = useNavigate();

    function playAgain(e) {
        dispatch({type: "RESET_SCORES"})
        navigate("/play/game")
    }

    function playAgainDifferentTeams(e) {
        dispatch({type: "RESET_SCORES"})
        navigate("/play/teams")
    }

    return (
    <div className="Results">
        <div className="Winner">
            <h1 className="VictoryMessage">Congratulations!</h1>
            <h1 className="VictoryMessage"><span className={`WinnerName${winner.id.slice(5)}`}>{winner.name}</span> won with {winner.points} points!</h1>
            <div className={`Mvp Mvp${winner.id.slice(5)}`}>
                <h1 className="MvpText"><span className="MvpM">M</span><span className="MvpV">V</span><span className="MvpP">P</span></h1>
                <h2 className="MvpMessage"><span className={`MvpName${winner.id.slice(5)}`}>{mvp.name}</span> scored the most points for their team: <p className="MvpPoints">{mvp.points}</p></h2>
            </div>
        </div>
        <div className="PlayerStats">
        {/* TODO */}
        </div>
        <Scoreboard teams={teams} />
        <div className="NavButtons">
            <button className="ChangeTeamsButton" onClick={playAgainDifferentTeams}>Change Teams</button>
            <button className="PlayAgainButton" onClick={playAgain}>Play Again</button>
        </div>
    </div>
    )
}