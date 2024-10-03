import "./HowToPlay.css"
import { useState } from "react"
import LeftArrow from "../../assets/left_arrow.svg"
import RightArrow from "../../assets/right_arrow.svg"
import LeftFilled from "../../assets/left_filled.svg"
import RightFilled from "../../assets/right_filled.svg"
import HowToPlayArrow from "../../components/HowToPlayArrow/HowToPlayArrow"

export default function HowToPlay () {
    const [page, setPage] = useState(1);

    return (
    <div className="HowToPlay">
        <HowToPlayArrow arrowIcon={LeftArrow} filledIcon={LeftFilled} disabled={page < 2} setPage={setPage} stepIncrement={ -1 } />
        <div className="SlideContainer" ></div>
        <HowToPlayArrow arrowIcon={RightArrow} filledIcon={RightFilled} disabled={page > 4} setPage={setPage} stepIncrement={ 1 } />
    </div>
    )
}