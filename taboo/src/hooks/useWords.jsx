import { useState, useEffect } from "react";

export default function useWords(counter, round, getRandomIndex) {
    const [words, setWords] = useState(null);
    const [word, setWord] = useState(null);

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