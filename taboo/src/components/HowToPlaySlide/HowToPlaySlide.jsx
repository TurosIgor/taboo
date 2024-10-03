import "./HowToPlaySlide.css"
import { useNavigate } from "react-router-dom";
import TeamForm from "../TeamForm/TeamForm.jsx";
import Card from "../Card/Card.jsx";
import UI from "../UI/UI.jsx"

export default function HowToPlaySlide({ page }) {
    const navigate = useNavigate();
    const exampleTeam = {
        id: "team_1", points: 0, current: true, name: "Team 1", players: [{ name: "Player 1", current: true, id: "player_1" }, { name: "Player 2", current: false, id: "player_2" }] 
    }
    const exampleWord = {word: "Adventure", taboo: ["journey", "explore", "exciting", "trip", "risk"], point: 1};

    switch(page) {
        case 1:
            return (
            <div className="HowToPlaySlide SlideOne">
                <h1>
                    <span className="TitleText">Taboo</span> is a party game, designed to play with 4-16 people sharing a device.
                </h1>
            </div>
            );
        case 2:
            return (
                <div className="HowToPlaySlide SlideTwo">
                    <h2>
                        Divide Your party into two teams! Players take turns to try and score as many points as possible.
                    </h2>
                    <TeamForm team={exampleTeam} dispatch={null} teams={[exampleTeam]} started={false} />
                </div>
            );
        case 3:
            return (
                <div className="HowToPlaySlide SlideThree">
                    <h2>
                        On a player's turn, they have 60 seconds to score as many points as they can. They must describe the top word of the card, without using the <span className="TabooRedText">Taboo</span> words below.
                    </h2>
                    <Card word={exampleWord} flipping={false} setFlipping={null} setPassed={null} passCard={null} nextCard={null} setCounter={null} passed={false} />
                </div>
            );
        case 4:
            return (
                <div className="HowToPlaySlide SlideFour">
                    <h2>
                        If the player's team successfully guessed the top word, pressing the <span className="NextText">Next</span> button - or swiping right on mobile devices - grants the team the points associated with the word.
                    </h2>
                    <UI passCard={null} nextCard={null} round={1} timer={60} scores={{team_1: {round1: 0}}} team={exampleTeam} initialTimer={60} />
                    <h3>
                        If the player accidentally said any of the <span className="TabooRedText">Taboo</span> words, or they find the word too hard, they can <span className="PassText">Pass</span> - by also swiping left - and get another card.
                    </h3>
                </div>
            );
        case 5:
            return (
                <div className="HowToPlaySlide SlideFive">
                    <h1>
                        After 8 rounds of back-and-forth, the <span className="VictoriousText">victorious</span> team is announced!
                    </h1>
                </div>
            );
        default:
            return navigate("/")
    }
}