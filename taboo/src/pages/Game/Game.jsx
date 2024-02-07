import Card from "../../components/Card/Card"
import fs from "fs/promises"
import React, { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import Timer from "../../components/Timer/Timer";
import "./Game.css"

export default function Game() {
    const [words, setWords] = useState(null);
    const [word, setWord] = useState(null);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(60);
    const [flipping, setFlipping] = useState(false);
    const [passed, setPassed] = useState(false);
    const { teams, dispatch } = useOutletContext();
    const [started, setStarted] = useState(false);
    const [round, setRound] = useState(1);
    const [lastIndexes, setLastIndexes] = useState({team_1: -1, team_2: -1})
    const navigate = useNavigate();

    function getRandomIndex(array) {
        const index = Math.floor(Math.random() * array.length)
        return index;
    }
    function swapTeams(teams) {
        const nextTeam = teams.find(team => !team.current)
        setLastIndexes({...lastIndexes, [nextTeam.id]: lastIndexes[nextTeam.id] <= nextTeam?.players.length - 2 ? lastIndexes[nextTeam?.id] + 1 : 0})
        const nextPlayer = nextTeam.players[lastIndexes[nextTeam.id] + 1] ?? nextTeam.players[0]
        dispatch({ type: "CHOOSE_TEAM", teamId: nextTeam?.id, playerId: nextPlayer?.id })
    }

    useEffect(() => {
        async function readWords() {
            const response = await fetch("/api/words");
            const data = await response.json();
            setWords(data);
        }
        readWords()
        const teamNr = getRandomIndex(teams)
        setLastIndexes({...lastIndexes, [`team_${teamNr + 1}`]: 0})
        dispatch({ type: "CHOOSE_TEAM", teamId: teams[teamNr].id, playerId: teams[teamNr].players[0].id })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (words) {
                const randomIndex = getRandomIndex(words);
                setWord(words[randomIndex])
            }
        }, 200)
        setTimeout(() => {
            setFlipping(false)
        }, 400)
        if(round > 16) {
            navigate("/play/results")
        }
    }, [counter, words, round])

    return (
        <div className="Game">
            {started ? word && <>
                <h2 className="PlayerName">{teams.find(team => team.current)?.players.find(player => player.current)?.name}'s turn</h2>
                <Card word={word} flipping={flipping} passed={passed} />
                <div className="UI">
                    <button type="button" className="Pass" onClick={e => {
                        setPassed(true)
                        setCounter(counter + 1)
                        setFlipping(true)
                    }} >Pass</button>
                    <button type="button" className="Next" onClick={e => {
                        setPassed(false)
                        dispatch({ type: "ADD_POINT", teamId: teams.find(team => team.current).id, points: word.point })
                        setCounter(counter + 1)
                        setFlipping(true)
                    }} >Next</button>
                    <Timer round={round} setRound={setRound} swapTeams={swapTeams} setCounter={setCounter} setStarted={setStarted} teams={teams} dispatch={dispatch} timer={timer} setTimer={setTimer} />
                    <h3 className="TeamPoints">Points: {teams.find(team => team.current).points}</h3>
                </div> </> :
                <div className="StartMessage">
                    <h2>{teams?.find(team => team.current)?.name}: It's {teams.find(team => team.current)?.players.find(player => player.current)?.name}'s turn!</h2>
                    <h3 className="TeamPoints">Points: {teams.find(team => team.current)?.points ?? 0}</h3>
                    <h3 className="RoundCounter">Round: {round}</h3>
                    <button type="button" className="Start" onClick={e => {
                        setTimer(60)
                        setStarted(true)
                        }}>Start</button>
                </div>
            }
        </div>
    )
}