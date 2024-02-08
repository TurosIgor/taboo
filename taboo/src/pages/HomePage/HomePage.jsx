import { useNavigate } from "react-router-dom"
import "./HomePage.css"
import TabooLogo from "../../assets/TabooLogo.png"

export default function HomePage () {
    const navigate = useNavigate();

    return(
        <div className="HomePage">
            <img className="HomeLogo" src={TabooLogo} />
            <button className="HomeButton" type="button" onClick={e => navigate("/play/teams")} >Play</button>
            <button className="HomeButton" type="button" onClick={e => navigate("/howTo")} >How to Play</button>
        </div>
    )
}