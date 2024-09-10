import Card from "../../components/Card/Card"
import React, { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Game.css"
import UI from "../../components/UI/UI";
import StartScreen from "../../components/StartScreen/StartScreen";
import useWords from "../../hooks/useWords";
import useTimer from "../../hooks/useTimer";

function getTeamForm(rounds) {
    const teamForm = {};

    for(let i = 1; i <= rounds; i++) {
        teamForm[`round${i}`] = 0;
    }

    return teamForm;
}

export default function Game() {
    const rounds = 8;
    const [counter, setCounter] = useState(0);
    const [flipping, setFlipping] = useState(false);
    const [passed, setPassed] = useState(false);
    const { teams, dispatch } = useOutletContext();
    const [team, setTeam] = useState(teams.find(team => team.current));
    const [player, setPlayer] = useState(team?.players?.find(player => player.current));
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(1);
    const [lastIndexes, setLastIndexes] = useState({ team_1: -1, team_2: -1 })
    const [showScores, setShowScores] = useState(false)
    const [scores, setScores] = useState({ team_1: getTeamForm(rounds), team_2: getTeamForm(rounds) })
    const [startTimer, setStartTimer] = useState(3)
    const [isOver, setIsOver] = useState(false);
    const navigate = useNavigate();
    const { timer, startRound } = useTimer(setStarted, setIsOver, setStartTimer, swapTeams, setRound, started, startTimer, round)
    const word = useWords(counter, round, getRandomIndex);

    function getRandomIndex(array) {
        const index = Math.floor(Math.random() * array.length)
        return index;
    }

    function passCard(e, isTouch) {
        setCounter(counter + 1)
        if (!isTouch) {
            setPassed(true)
            setFlipping(true)
        }
    }
    function nextCard(e, isTouch) {
        setScores({ ...scores, [team.id]: { ...scores[team.id], [`round${round}`]: scores[team.id][`round${round}`] ? scores[team.id][`round${round}`] + word.point : word.point } })
        dispatch({ type: "ADD_POINT", teamId: team.id, points: word.point })
        setCounter(counter + 1)
        if (!isTouch) {
            setPassed(false)
            setFlipping(true)
        }
    }
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
        
        if(flipping) {
            setTimeout(() => {
                setFlipping(false)
            }, 400)
        }
        if (round > (rounds * teams.length)) {
            navigate("/play/results")
        }
    }, [counter, round])

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
                <UI passCard={passCard} nextCard={nextCard} round={round} timer={timer} scores={scores} team={team} />
            </div> 
            :
            <StartScreen teams={teams} team={team} player={player} showScores={showScores} setShowScores={setShowScores} round={round} startRound={startRound} scores={scores}/>
            }
        </div>
    )
}