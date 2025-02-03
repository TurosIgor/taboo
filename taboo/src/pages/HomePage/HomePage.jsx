import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react";
import "./HomePage.css"
import TabooLogo from "../../assets/TabooLogo.png"
import ColorPicker from "../../components/ColorPicker/ColorPicker";

export default function HomePage () {
    const navigate = useNavigate();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const {colors} = useOutletContext();

    return(
        <div className="HomePage" >
            <img className="HomeLogo" src={TabooLogo} />
            <button className="HomeButton" style={{backgroundImage: `linear-gradient(to right, ${colors.uiColor.from}, ${colors.uiColor.to})`}} type="button" onClick={e => navigate("/play/teams")} >Play</button>
            <button className="HomeButton" style={{backgroundImage: `linear-gradient(to right, ${colors.uiColor.from}, ${colors.uiColor.to})`}} type="button" onClick={e => navigate("/howTo")} >How to Play</button>
            <button className="HomeButton" style={{backgroundImage: `linear-gradient(to right, ${colors.uiColor.from}, ${colors.uiColor.to})`}} type="button" onClick={e => setShowColorPicker(!showColorPicker)} >Change Colors</button>
            {showColorPicker && <ColorPicker />}
        </div>
    )
}