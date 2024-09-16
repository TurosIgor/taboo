import useTimer from "../../hooks/useTimer"
import "./Timer.css"
import React, { useState, useEffect } from "react"

export default function Timer({ timer, initialTimer }) {

    return (
        <div className="Timer" flashing={timer < 11 ? "true" : "false"}>
            <div className="TimerSlider" style={{"width" : `${timer * 100 / initialTimer}%`}}></div>
            <div className="TimerNumber">{Math.ceil(timer)}</div>
        </div>
    )
}