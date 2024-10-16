import { useState } from "react";

export default function TeamForm ({ team, dispatch, teams, started }) {
    const playersOfTeams = teams.map(team => team.players)
    const players = playersOfTeams[0].concat(playersOfTeams[1])
    const [renamingTeam, setRenamingTeam] = useState(false);
    const [renamingPlayer, setRenamingPlayer] = useState(undefined);
    const [name, setName] = useState("");

    const getPlayerId = () => {
        for(let i = 1; i < 11; i++) {
            if(!players.find(player => parseInt(player.id.split("_")[1]) === i)) {
                return i;
            }
        }
    }

    return (
        <div className={`Team ${team.id}`} started={started.toString()} style={started ? {} : {"height":`${32 + (team.players.length - 2) * 8.2}rem`}} >
            {renamingTeam ? <><input className="TeamNameInput" defaultValue={team.name} onChange={e => dispatch({type: "RENAME_TEAM", teamId: team.id, name: e.target.value || `Team ${team.id.split("_")[1]}`})} /><button className="SaveButton" onClick={e => setRenamingTeam(false)}>Save</button></> : <><h3 className="TeamName">{team.name}</h3>
            <button type="button" className="RenameTeamButton" onClick={e => setRenamingTeam(true)}>Rename</button></>}
            <div className="Players">
                {team.players.map(player => (
                <div key={player.id} className="Player">
                    {renamingPlayer && renamingPlayer === player.id ? <input className="PlayerNameInput" defaultValue={player.name} onChange={e => dispatch({type: "RENAME_PLAYER", teamId: team.id, playerId: player.id, name: e.target.value || `Player ${player.id.split("_")[1]}`})} /> : <h4 className="PlayerName">{player.name}</h4>}
                    <div className="PlayerButton" type="button">
                    {renamingPlayer && renamingPlayer === player.id ? <button className="SaveButton" onClick={e => setRenamingPlayer(undefined)}>Save</button> : <button type="button" className="RenamePlayerButton" onClick={e => setRenamingPlayer(player.id)}>Rename</button>}
                    <button type="button" className="RemoveButton" onClick={e => dispatch({ type: "REMOVE_PLAYER", teamId: team.id, playerId:player.id })} >Remove</button>
                    </div>
                </div>
                ))}
            </div>
            <button disabled={players.length > 7} type="button" className="AddPlayer" onClick={e => dispatch({type: "ADD_PLAYER", teamId: team.id, player:{ id: `player_${getPlayerId()}`, name: `Player ${getPlayerId()}`, points: 0, current: true}})} >Add Player</button>
        </div>
    )
}