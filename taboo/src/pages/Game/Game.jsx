import "./Game.css"
import React, { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card"
import UI from "../../components/UI/UI";
import StartScreen from "../../components/StartScreen/StartScreen";
import useWords from "../../hooks/useWords";
import useTimer from "../../hooks/useTimer";
import useCard from "../../hooks/useCard";

export default function Game() {
    const rounds = 8;
    const initialStartTimer = 3;
    const { teams, dispatch } = useOutletContext();
    const [counter, setCounter] = useState(0);
    const [team, setTeam] = useState(teams.find(team => team.current));
    const [player, setPlayer] = useState(team?.players?.find(player => player.current));
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(1);
    const [lastIndexes, setLastIndexes] = useState({ team_1: -1, team_2: -1 })
    const [showScores, setShowScores] = useState(false)
    const [startTimer, setStartTimer] = useState(initialStartTimer)
    const [isOver, setIsOver] = useState(false);
    const { timer, startRound, initialTimer } = useTimer(setStarted, setIsOver, setStartTimer, swapTeams, setRound, started, startTimer, round)
    const word = useWords(counter);
    const { flipping, setFlipping, passed, setPassed, nextCard, passCard } = useCard(dispatch, teams, setTeam, team, word, counter, setCounter, round)
    const navigate = useNavigate();

    function swapTeams() {
        const nextTeam = teams.find(team => !team.current)
        setLastIndexes({ ...lastIndexes, [nextTeam.id]: lastIndexes[nextTeam.id] <= nextTeam?.players.length - 2 ? lastIndexes[nextTeam?.id] + 1 : 0 })
        const nextPlayer = nextTeam.players[lastIndexes[nextTeam.id] + 1] ?? nextTeam.players[0]
        dispatch({ type: "CHOOSE_TEAM", teamId: nextTeam?.id, playerId: nextPlayer?.id })
        setTeam(nextTeam);
        setPlayer(nextPlayer);
    }

    useEffect(() => {
        setShowScores(false)

        async function endSession() {
            const response = await fetch("/api/v2/end");
            if(!response.ok) {
                console.log("something went wrong when aborting session")
            }
        }

        if (round > (rounds * teams.length)) {
            endSession();
            navigate("/play/results")
        }
    }, [round])

    if (started & startTimer > 0) {
        return <h1 className="StartTimer">{startTimer}</h1>
    }
    return (
        <div className="GameContainer">
            {
            started & startTimer < 1 ? word && 
            <div key={word} className="Game" isover={isOver.toString()} >
                <h2 className="PlayerName">{player?.name}'s turn</h2>
                <Card setCounter={setCounter} setFlipping={setFlipping} setPassed={setPassed} passCard={passCard} nextCard={nextCard} word={word} flipping={flipping} passed={passed} />
                <UI passCard={passCard} nextCard={nextCard} round={round} timer={timer} initialTimer={initialTimer} team={team} />
            </div> 
            :
            <StartScreen teams={teams} team={team} player={player} showScores={showScores} setShowScores={setShowScores} round={round} startRound={startRound} />
            }
        </div>
    )
}