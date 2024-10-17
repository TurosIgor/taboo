import { useEffect, useState } from "react"

export default function useCard(dispatch, teams, setTeam, team, word, counter, setCounter, round) {
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
        dispatch({ type: "ADD_POINT", teamId: team.id, points: word.point, round: Math.ceil(round / 2) })
        setCounter(counter + 1)
        if (!isTouch) {
            setPassed(false)
            setFlipping(true)
        }
    }

    useEffect(() => {
        setTeam(teams.find(tm => tm.current))        
        if(flipping) {
            setTimeout(() => {
                setFlipping(false)
            }, 400)
        }
    }, [counter])

    return {flipping, setFlipping, passed, setPassed, nextCard, passCard}
}