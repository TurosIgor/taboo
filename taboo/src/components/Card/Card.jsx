import "./Card.css"
import TabooLogo from "../../assets/TabooLogo.png"
import { useMemo, useState, useEffect } from "react";

export default function Card({ word, flipping, setFlipping, setPassed, passCard, nextCard, setCounter, passed }) {
    const memoizedTaboos = useMemo(() => word.taboo, [word])
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [angle, setAngle] = useState(0)
    const [touchedAt, setTouchedAt] = useState(null)
    const [letGoAt, setLetGoAt] = useState(null)
    const [fontSize, setFontSize] = useState(100)

    const minSwipeDistance = 90

    const onTouchStart = (e) => {
        setTouchedAt(e.timeStamp)
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setLetGoAt(e.timeStamp)
        setTouchEnd(e.targetTouches[0].clientX)
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        const ang = Math.abs(distance * 1.28)
        if (touchEnd && Math.abs(distance) > minSwipeDistance) {
            if (isLeftSwipe) {
                setPassed(true)
                setAngle(ang < 180 ? -ang : -180)
            } else if (isRightSwipe) {
                setPassed(false)
                setAngle(ang < 180 ? ang : 180)
            }
        }

    }

    const onTouchEnd = (e) => {
        setTimeout(() => {
            if (!touchStart || !touchEnd) return
            const distance = touchStart - touchEnd
            const isLeftSwipe = distance > minSwipeDistance
            const isRightSwipe = distance < -minSwipeDistance
            if ((isLeftSwipe || isRightSwipe) && letGoAt - touchedAt < 200) {
                setFlipping(true)
                setCounter(counter => counter + 1)
            }
            if (Math.abs(angle) > 150) {
                if (isLeftSwipe) {
                    passCard(null, true)
                } else if (isRightSwipe) {
                    nextCard(null, true)
                }
            }
            setAngle(0)
        }, 100)
    }

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