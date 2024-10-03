import "./HowToPlayArrow.css"
import { useState, useEffect } from "react"

export default function HowToPlayArrow ({ arrowIcon, filledIcon, disabled, setPage, stepIncrement }) {
    const [hover, setHover] = useState(false);
    const [icon, setIcon] = useState(undefined);

    useEffect(() => {
        if(!disabled) {
            setTimeout(() => {
                setIcon(hover ? filledIcon : arrowIcon)
            }, 100)
        } else {
            setIcon(arrowIcon);
        }
    }, [hover])

    return (
    <img className="HowToPlayArrow" 
        disabled={disabled} 
        src={icon} 
        onClick={e => setPage(page => page + stepIncrement)}
        onMouseEnter={e => setHover(true)} 
        onMouseLeave={e => setHover(false)} 
        />
    )
}