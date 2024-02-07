import Card from "../../components/Card/Card"
import fs from "fs/promises"
import React, { useState, useEffect } from "react"
import Timer from "../../components/Timer/Timer";
import "./Game.css"

export default function Game() {
    const [words, setWords] = useState(null);
    const [word, setWord] = useState(null);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(60);
    const [flipping, setFlipping] = useState(false);
    const [passed, setPassed] = useState(false);


    const getRandomIndex = (words) => {
        const index = Math.floor(Math.random() * words.length)
        return index;
    }

    useEffect(() => {
        async function readWords() {
            const response = await fetch("/api/words");
            const data = await response.json();
            setWords(data);
        }
        readWords()
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
    }, [counter, words])

    return (
        <div className="Game">
            {word ? <Card word={word} flipping={flipping} passed={passed} /> : <></>}
            <div className="UI">
                <button type="button" className="Pass" onClick={e => {
                    setPassed(true)
                    setCounter(counter + 1)
                    setFlipping(true)
                    }} >Pass</button>
                <button type="button" className="Next" onClick={e => {
                    setPassed(false)
                    setCounter(counter + 1)
                    setFlipping(true)
                    }} >Next</button>
                <Timer timer={timer} setTimer={setTimer} />
            </div>
        </div>
    )
}