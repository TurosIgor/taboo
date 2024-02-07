import "./Timer.css"
import React, { useState, useEffect } from "react"

export default function Timer({ timer, setTimer, teams, dispatch, setStarted, setCounter, swapTeams, round, setRound }) {
    useEffect(() => {
        setTimeout(() => {
            setTimer(timer > 0 ? timer - 1 : 0);
            if(timer === 0) {
                swapTeams(teams);
                setRound(round + 1)
                setStarted(false);
            }
        }, 1000)
    }, [timer])

    return (
        <div className="Timer">
            <div className="TimerSlider" style={{"width" : `${timer * 100 / 60}%`}}></div>
            <div className="TimerNumber">{Math.ceil(timer)}</div>
        </div>
    )
}