import "./Timer.css"
import React, { useState, useEffect } from "react"

export default function Timer({ timer, setTimer }) {
    useEffect(() => {
        setTimeout(() => {
            setTimer(timer - 1)
        }, 1000)
    }, [timer])

    return (
        <div className="Timer">
            <div className="TimerSlider" style={{"width" : `${timer * 100 / 60}%`}}></div>
            <div className="TimerNumber">{Math.ceil(timer)}</div>
        </div>
    )
}