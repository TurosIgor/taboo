import { useState } from "react";

export default function useTouch(nextCard, passCard, setPassed, setFlipping, setCounter) {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [angle, setAngle] = useState(0)
    const [touchedAt, setTouchedAt] = useState(null)
    const [letGoAt, setLetGoAt] = useState(null)
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
        } else if(touchEnd && Math.abs(distance) < minSwipeDistance) {
            setAngle(0)
        }

    }

    const onTouchEnd = (e) => {
        setTimeout(() => {
            if (!touchStart || !touchEnd) return
            const distance = touchStart - touchEnd
            const isLeftSwipe = distance > minSwipeDistance
            const isRightSwipe = distance < -minSwipeDistance
            if ((isLeftSwipe || isRightSwipe) && letGoAt - touchedAt < 250) {
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

    return { onTouchStart, onTouchMove, onTouchEnd, angle }
}