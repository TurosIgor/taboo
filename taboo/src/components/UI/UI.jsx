import Timer from "../../components/Timer/Timer";

export default function UI({ passCard, nextCard, setCounter, setStarted, setRound, round, timer, setTimer, scores, teams, dispatch, swapTeams, team }) {
    console.log(team)
    return (
    <div className="UI">
        <button type="button" className="Pass" onClick={e => passCard(e, false)} >Pass</button>
        <button type="button" className="Next" onClick={e => nextCard(e, false)} >Next</button>
        <Timer round={round} setRound={setRound} swapTeams={swapTeams} setCounter={setCounter} setStarted={setStarted} teams={teams} dispatch={dispatch} timer={timer} setTimer={setTimer} />
        <h3 className="TeamPoints">Points: {scores[team.id][`round${round}`]}</h3>
    </div>
    )
}