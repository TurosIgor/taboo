import "./Card.css"

export default function Card({ word, flipping, setFlipping }) {

    return (
        <div className="TabooCard" flipping={flipping.toString()} >
            <div className="TabooCardInner">
                <div className="TabooCardFront" >
                    <span className="Point">{word.point}</span>
                    <h2 className="Word">{word.word}</h2>
                    <div className="Taboos">
                        {word.taboo.map((taboo, i) => <h3 key={`taboo${i * Date.now()}`} className="Taboo">{taboo}</h3>)}
                    </div>
                </div>
                <div className="TabooCardBack"><p className="rotate">TABOO</p></div>
            </div>
        </div>
    )
}