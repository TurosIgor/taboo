import { useEffect, useState } from "react"

export default function useCard(dispatch, teams, team, word, counter, setCounter, scores, setScores, setShowScores, round) {
    const [flipping, setFlipping] = useState(false);
    const [passed, setPassed] = useState(false);

    function passCard(e, isTouch) {
        setCounter(counter + 1)
        if (!isTouch) {
            setPassed(true)
            setFlipping(true)
        }
    }
    function nextCard(e, isTouch) {
        setScores({ ...scores, [team.id]: { ...scores[team.id], [`round${Math.ceil(round / 2)}`]: scores[team.id][`round${Math.ceil(round / 2)}`] ? scores[team.id][`round${Math.ceil(round / 2)}`] + word.point : word.point } })
        dispatch({ type: "ADD_POINT", teamId: team.id, points: word.point })
        setCounter(counter + 1)
        if (!isTouch) {
            setPassed(false)
            setFlipping(true)
        }
    }

    useEffect(() => {        
        if(flipping) {
            setTimeout(() => {
                setFlipping(false)
            }, 400)
        }
    }, [counter])

    return {flipping, setFlipping, passed, setPassed, nextCard, passCard}
}