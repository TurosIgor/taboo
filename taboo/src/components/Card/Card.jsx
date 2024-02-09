import "./Card.css"
import TabooLogo from "../../assets/TabooLogo.png"
import { useMemo, useState } from "react";

export default function Card({ word, flipping, setFlipping, setPassed, passCard, nextCard, passed }) {
    const memoizedTaboos = useMemo(() => word.taboo, [word])
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [angle, setAngle] = useState(0)

    const minSwipeDistance = 75

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        const ang = Math.abs(distance * 1.28)
        if(touchEnd && Math.abs(distance) > minSwipeDistance){
            if(isLeftSwipe) {
                setPassed(true)
                setAngle(ang < 180 ? -ang : -180)
            } else if(isRightSwipe) {
                setPassed(false)
                setAngle(ang < 180 ? ang : 180)
            }
        }
        
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        console.log(touchStart, touchEnd)
        if(Math.abs(angle) > 150) {
            if(isLeftSwipe){
                passCard(null, true)
            } else if(isRightSwipe) {
                nextCard(null, true)
            }
        }
        setAngle(0)
    }

    return (
        <div className="TabooCard" flipping={flipping.toString()} passed={passed.toString()} 
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            <div className="TabooCardInner" style={angle ? {"transform": `rotateY(${angle}deg)`} : {}}>
                <div className="TabooCardFront" >
                    <span className="Point">{word.point}</span>
                    <h2 className="Word">{word.word}</h2>
                    <div className="Taboos">
                        {memoizedTaboos.map((taboo, i) => <h3 key={`taboo${i}`} className="Taboo">{taboo}</h3>)}
                    </div>
                </div>
                <div className="TabooCardBack" ><img src={TabooLogo} className="rotate" /></div>
            </div>
        </div>
    )
}