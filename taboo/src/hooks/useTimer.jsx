import { useState, useEffect } from "react";

export default function useTimer(setStarted, setIsOver, setStartTimer, swapTeams, setRound, started, startTimer, round) {
    const initialTimer = 60;
    const initialCountdown = 3;
    const [timer, setTimer] = useState(initialTimer);
    const [countdown, setCountdown] = useState(false);

    function startRound(e) {
        setTimer(initialTimer)
        setIsOver(false)
        setStarted(true)
        setStartTimer(initialCountdown)
        setTimeout(() => {
            setCountdown(true)
        }, initialCountdown * 1000);
    }

    useEffect(() => {
        if(countdown) {
            if(timer < 1) {
                setIsOver(true);
            }
            setTimeout(() => {
                setTimer(timer > 0 ? timer - 1 : 0);
                if(timer === 0) {
                    swapTeams();
                    setRound(round + 1)
                    setStarted(false);
                    setCountdown(false);
                }
            }, 1000)
        }
    }, [timer, countdown])

    useEffect(() => {
        if (started) {
            if (startTimer > 0) {
                setTimeout(() => {
                    setStartTimer(startTimer - 1)
                }, 1000)
            }
        }
    }, [started, startTimer])

    return {timer, startRound, initialTimer}
}