import { useState, useEffect } from "react";

export default function useWords(counter) {
    const [word, setWord] = useState(null);

    useEffect(() => {
        async function readAndSetWord() {
            const response = await fetch ("/api/v2/word");
            const data = await response.json();
            if (data) {
                setWord(data)
            }
        }
        readAndSetWord();
    }, [counter])

    return word
}