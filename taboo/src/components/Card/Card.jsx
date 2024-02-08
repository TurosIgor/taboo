import "./Card.css"
import TabooLogo from "../../assets/TabooLogo.png"

export default function Card({ word, flipping, passed }) {

    return (
        <div className="TabooCard" flipping={flipping.toString()} passed={passed.toString()} >
            <div className="TabooCardInner">
                <div className="TabooCardFront" >
                    <span className="Point">{word.point}</span>
                    <h2 className="Word">{word.word}</h2>
                    <div className="Taboos">
                        {word.taboo.map((taboo, i) => <h3 key={`taboo${i * Date.now()}`} className="Taboo">{taboo}</h3>)}
                    </div>
                </div>
                <div className="TabooCardBack"><img src={TabooLogo} className="rotate" /></div>
            </div>
        </div>
    )
}