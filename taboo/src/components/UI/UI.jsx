import Timer from "../../components/Timer/Timer";

export default function UI({ passCard, nextCard, round, timer, team, initialTimer }) {
    return (
    <div className="UI">
        <button type="button" className="Pass" onClick={e => passCard(e, false)} >Pass</button>
        <button type="button" className="Next" onClick={e => nextCard(e, false)} >Next</button>
        <Timer timer={timer} initialTimer={initialTimer} />
        <h3 className="TeamPoints">Points: {team.scores[`round${Math.ceil(round / 2)}`]}</h3>
    </div>
    )
}