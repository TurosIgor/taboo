import Timer from "../../components/Timer/Timer";

export default function UI({ passCard, nextCard, setCounter, setStarted, setRound, round, timer, setTimer, setLastIndexes, lastIndexes, scores, teams, dispatch }) {
    function swapTeams(teams) {
        const nextTeam = teams.find(team => !team.current)
        setLastIndexes({ ...lastIndexes, [nextTeam.id]: lastIndexes[nextTeam.id] <= nextTeam?.players.length - 2 ? lastIndexes[nextTeam?.id] + 1 : 0 })
        const nextPlayer = nextTeam.players[lastIndexes[nextTeam.id] + 1] ?? nextTeam.players[0]
        dispatch({ type: "CHOOSE_TEAM", teamId: nextTeam?.id, playerId: nextPlayer?.id })
    }

    return (
    <div className="UI">
        <button type="button" className="Pass" onClick={e => passCard(e, false)} >Pass</button>
        <button type="button" className="Next" onClick={e => nextCard(e, false)} >Next</button>
        <Timer round={round} setRound={setRound} swapTeams={swapTeams} setCounter={setCounter} setStarted={setStarted} teams={teams} dispatch={dispatch} timer={timer} setTimer={setTimer} />
        <h3 className="TeamPoints">Points: {scores[teams.find(team => team.current).id][`round${round}`]}</h3>
    </div>
    )
}