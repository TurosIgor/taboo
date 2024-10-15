import Scoreboard from "../../components/Scoreboard/Scoreboard";

export default function StartScreen({teams, team, player, showScores, setShowScores, round, startRound}) {
    return (
        <div className={`StartMessage ${team?.id}`} style={{ "height": `${showScores ? 34 : 18}rem` }} >
            <h3>Next up: <span className="PlayerName">{player?.name}</span></h3>
            <h4>from <span className="TeamName">{team?.name}</span></h4>
            <h3 className="RoundCounter">Round {round}</h3>
            <button type="button" className="Start" onClick={startRound}>Start</button>
            <button type="button" className="ShowScoreboard" onClick={e => setShowScores(!showScores)}>{showScores ? "Hide" : "Show"} Scores</button>
            <Scoreboard teams={teams} />
        </div>
    )
}