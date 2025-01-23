import { Outlet } from "react-router-dom";
import { useReducer } from "react";
import { colorReducer } from "../../hooks/colorReducer";

const defaultColors = {
    bgColor: {
        from: "rgba(210, 179, 245, 1)",
        to: "rgba(189, 145, 240, 1)"
    },
    uiColor: {
        from: "rgb(229, 232, 135)",
        to: "rgb(240, 240, 63)"
    },
    team1Color: {
        bg: {
            from: "rgb(145, 175, 240)",
            to: "rgb(179, 200, 245)"
        },
        ui: {
            from: "rgb(93, 154, 152)",
            to: "rgb(103, 138, 134)"
        }
    },
    team2Color: {
        bg: {
            from: "rgb(233, 142, 142)",
            to: "rgb(245, 179, 179)"
        },
        ui: {
            from: "rgb(158, 127, 96)",
            to: "rgb(154, 135, 114)"
        }
    },
}

export default function Root() {
    const [colors, dispatch] = useReducer(colorReducer, defaultColors)

    return(
        <Outlet context={{colors, dispatch}} />
    )
}