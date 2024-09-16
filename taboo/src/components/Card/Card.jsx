import "./Card.css"
import TabooLogo from "../../assets/TabooLogo.png"
import { useMemo, useState, useEffect } from "react";
import useTouch from "../../hooks/useTouch";

export default function Card({ word, flipping, setFlipping, setPassed, passCard, nextCard, setCounter, passed }) {
    const memoizedTaboos = useMemo(() => word.taboo, [word])
    const { onTouchStart, onTouchMove, onTouchEnd, angle} = useTouch(nextCard, passCard, setPassed, setFlipping, setCounter);
    const [fontSize, setFontSize] = useState(100)

    useEffect(() => {
        const wordLength = word.word.length
        if(wordLength > 12) {
            setFontSize(100 - (wordLength - 12) * 5)
        } else {
            setFontSize(100)
        }
    }, [word])

    return (
        <div className="TabooCard" flipping={flipping.toString()} passed={passed.toString()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            <div className="TabooCardInner" style={angle ? { "transform": `rotateY(${angle}deg)` } : {}}>
                <div className="TabooCardFront" >
                    <span className="Point">{word.point}</span>
                    <h2 className="Word" style={{"fontSize": `${fontSize}%`}}>{word.word}</h2>
                    <div className="Taboos">
                        {memoizedTaboos.map((taboo, i) => <h3 key={`taboo${i}`} className="Taboo">{taboo}</h3>)}
                    </div>
                </div>
                <div className="TabooCardBack" ><img src={TabooLogo} className="rotate" /></div>
            </div>
        </div>
    )
}