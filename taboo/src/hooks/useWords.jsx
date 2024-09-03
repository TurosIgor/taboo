import { useState, useEffect } from "react";

export default function useWords(teams, dispatch, setLastIndexes, lastIndexes, counter, round) {
    const [words, setWords] = useState(null);
    const [word, setWord] = useState(null);

    function getRandomIndex(array) {
        const index = Math.floor(Math.random() * array.length)
        return index;
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
        setLastIndexes({ ...lastIndexes, [`team_${teamNr + 1}`]: 0 })
        dispatch({ type: "CHOOSE_TEAM", teamId: teams[teamNr].id, playerId: teams[teamNr].players[0].id })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (words) {
                const randomIndex = getRandomIndex(words);
                setWord(words[randomIndex])
                setWords(words.filter(wrd => wrd !== word));
            }
        }, 100)
    }, [counter, round])

    return word
}