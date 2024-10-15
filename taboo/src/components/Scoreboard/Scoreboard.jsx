import "./Scoreboard.css"

export default function Scoreboard({ teams }) {

    return (
        <div className="Scoreboard">
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(round => <th key={`round${round}`}>{round}</th>)}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.id} className={team.id}>
                            <td lang="en-GB">{team.name}</td>
                            {Object.values(team.scores).map((score, i) => <td key={`${team.id}_score${i}`}>{score}</td>)}
                            <td>{Object.values(team.scores).reduce((acc, curr) => acc += curr, 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}