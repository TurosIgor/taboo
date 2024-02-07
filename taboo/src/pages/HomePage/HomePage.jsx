import { useNavigate } from "react-router-dom"
import "./HomePage.css"

export default function HomePage () {
    const navigate = useNavigate();

    return(
        <div className="HomePage">
            <button className="HomeButton" type="button" onClick={e => navigate("/play/teams")} >Play</button>
            <button className="HomeButton" type="button" onClick={e => navigate("/howTo")} >How to Play</button>
        </div>
    )
}