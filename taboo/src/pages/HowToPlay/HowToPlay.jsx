import "./HowToPlay.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LeftArrow from "../../assets/left_arrow.svg"
import RightArrow from "../../assets/right_arrow.svg"
import LeftFilled from "../../assets/left_filled.svg"
import RightFilled from "../../assets/right_filled.svg"
import HowToPlayArrow from "../../components/HowToPlayArrow/HowToPlayArrow"
import HowToPlaySlide from "../../components/HowToPlaySlide/HowToPlaySlide"
import TabooLogo from "../../assets/TabooLogo.png"

export default function HowToPlay() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <>
            <img className="Logo" src={TabooLogo} onClick={e => navigate("/")} />
            <div className="HowToPlay">
                <div className="SlideContainer" >
                    <HowToPlaySlide page={page} />
                </div>
                <div className="SlideButtons" >
                    <HowToPlayArrow arrowIcon={LeftArrow} filledIcon={LeftFilled} disabled={page < 2} setPage={setPage} stepIncrement={-1} />
                    <HowToPlayArrow arrowIcon={RightArrow} filledIcon={RightFilled} disabled={page > 4} setPage={setPage} stepIncrement={1} />
                </div>
            </div>
        </>
    )
}