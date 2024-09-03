import Scoreboard from "../../components/Scoreboard/Scoreboard";

export default function StartScreen({teams, showScores, setShowScores, round, startRound, scores}) {
    return (
        <div className={`StartMessage ${teams.find(team => team.current)?.id}`} style={{ "height": `${showScores ? 34 : 18}rem` }} >
            <h3>Next up: <span className="PlayerName">{teams.find(team => team.current)?.players.find(player => player.current)?.name}</span></h3>
            <h4>from <span className="TeamName">{teams?.find(team => team.current)?.name}</span></h4>
            <h3 className="RoundCounter">Round {round}</h3>
            <button type="button" className="Start" onClick={startRound}>Start</button>
            <button type="button" className="ShowScoreboard" onClick={e => setShowScores(!showScores)}>{showScores ? "Hide" : "Show"} Scores</button>
            <Scoreboard teams={teams} scores={scores} />
        </div>
    )
}