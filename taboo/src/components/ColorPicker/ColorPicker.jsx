import { useOutletContext } from "react-router-dom"
import "./ColorPicker.css"
import { useEffect } from "react"
import { use } from "react";

export default function ColorPicker () {
    const {colors, dispatch} = useOutletContext();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("background-image", `linear-gradient(to right, ${colors.bgColor.from}, ${colors.bgColor.to}, ${colors.bgColor.from})`)
    }, [colors])
    return (
        <div className="ColorPicker">
            <div className="ColorScheme PurpleYellow" onClick={e => dispatch({type: "SWITCH_BACKGROUND", bgColorFrom: "rgba(210, 179, 245, 1)" , bgColorTo: "rgba(189, 145, 240, 1)" , uiColorFrom: "rgb(229, 232, 135)" , uiColorTo: "rgb(240, 240, 63)"})} />
            <div className="ColorScheme BlueOrange" onClick={e => dispatch({type: "SWITCH_BACKGROUND", bgColorFrom: "rgba(179, 193, 245, 1)", bgColorTo: "rgb(105, 133, 236)", uiColorFrom: "rgb(232, 190, 135)", uiColorTo: "rgb(240, 190, 63)"})} />
            <div className="ColorScheme BlackGrey" onClick={e => dispatch({type: "SWITCH_BACKGROUND", bgColorFrom: "#1a1a1a", bgColorTo: "#2e2e2e", uiColorFrom: "#aaaaaa", uiColorTo: "#5a5a5a" })} />
            <div className="ColorScheme Pink" onClick={e => dispatch({type: "SWITCH_BACKGROUND", bgColorFrom: "#f0b1d2", bgColorTo: "#f07fad", uiColorFrom: "#ea5ead", uiColorTo: "#e942a0"})} />
        </div>
    )
}