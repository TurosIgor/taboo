import Card from "../../components/Card/Card"
import fs from "fs/promises"
import React, { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import Timer from "../../components/Timer/Timer";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
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
    const [showScores, setShowScores] = useState(false)
    const [scores, setScores] = useState({ team_1: {}, team_2: {} })
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
            if (data) {
                const randomIndex = getRandomIndex(data);
                setWord(data[randomIndex])
            }
            setWords(data.filter(wrd => wrd !== word));
        }
        readWords()
        const teamNr = getRandomIndex(teams)
        setLastIndexes({...lastIndexes, [`team_${teamNr + 1}`]: 0})
        dispatch({ type: "CHOOSE_TEAM", teamId: teams[teamNr].id, playerId: teams[teamNr].players[0].id })
    }, [])

    useEffect(() => {
        setShowScores(false)
        setTimeout(() => {
            if (words) {
                const randomIndex = getRandomIndex(words);
                setWord(words[randomIndex])
                setWords(words.filter(wrd => wrd !== word));
            }
        }, 200)
        setTimeout(() => {
            setFlipping(false)
        }, 400)
        if(round > 16) {
            navigate("/play/results")
        }
    }, [counter, round])

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
                        setScores({...scores, [teams.find(team => team.current).id]: {...scores[teams.find(team => team.current).id], [`round${round}`]: scores[teams.find(team => team.current).id][`round${round}`] ? scores[teams.find(team => team.current).id][`round${round}`] + word.point : word.point}})
                        dispatch({ type: "ADD_POINT", teamId: teams.find(team => team.current).id, points: word.point })
                        setCounter(counter + 1)
                        setFlipping(true)
                    }} >Next</button>
                    <Timer round={round} setRound={setRound} swapTeams={swapTeams} setCounter={setCounter} setStarted={setStarted} teams={teams} dispatch={dispatch} timer={timer} setTimer={setTimer} />
                    <h3 className="TeamPoints">Points: {scores[teams.find(team => team.current).id][`round${round}`]}</h3>
                </div> </> :
                <div className={`StartMessage ${teams.find(team => team.current)?.id}`} style={{"height":`${showScores ? 34 : 18}rem`}} >
                    <h3>Next up: <span className="PlayerName">{teams.find(team => team.current)?.players.find(player => player.current)?.name}</span></h3>
                    <h4>from <span className="TeamName">{teams?.find(team => team.current)?.name}</span></h4>
                    <h3 className="RoundCounter">Round {round}</h3>
                    <button type="button" className="Start" onClick={e => {
                        setTimer(60)
                        setStarted(true)
                        }}>Start</button>
                    <button type="button" className="ShowScoreboard" onClick={e => setShowScores(!showScores)}>{showScores ? "Hide" : "Show"} Scores</button>
                    <Scoreboard teams={teams} scores={scores} />
                </div>
            }
        </div>
    )
}