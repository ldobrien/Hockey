import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getPlayerPoints} from './PlayerStats'
import './styles.css'

class TeamStats extends Component {
    state ={
        scoreboard: this.props.scoreboard,
    }

    renderPlayers = (players) => {
        let points = getPlayerPoints(players)
        if(players.position === "Goalie"){
            let key = players.name + this.props.index
            return (
                <div className="row" key={key}>
                    <div className="col s2">{players.name}</div>
                    <div className="col s2">{players.wins}</div>
                    <div className="col s2">{players.shutouts}</div>
                    <div className="col s2">{players.goals}</div>
                    <div className="col s2">{players.assists}</div>
                    <div className="col s2">{points}</div>
                </div>
            )
        }
        return (
            <div className="row" key={players.name}>
                <div className="col s3">{players.name}</div>
                <div className="col s3">{players.goals}</div>
                <div className="col s3">{players.assists}</div>
                <div className="col s3">{points}</div>
            </div>
        )
    }

    render() {
        const {entry} = this.props

        const teamScoreboards = []
        let display = false

        let playerList = []
        entry.forEach(player => {
            if(player.position === "Goalie" && display === false){
                display = true
                playerList.push(
                    <div className="row" key={playerList.length}>
                        <hr/>
                        <p>Goalies</p>
                        <div className="col s2">Name:</div>
                        <div className="col s2">Wins</div>
                        <div className="col s2">Shutouts</div>
                        <div className="col s2">Goals</div>
                        <div className="col s2">Assists</div>
                        <div className="col s2">Points</div>
                    </div>
                )
            }
            const render = this.renderPlayers(player)
            playerList.push(render)
        })
        
        teamScoreboards.push(
            <div className="row" key={teamScoreboards.length}>
                <hr/>
                <p>Players</p>
                <div className="col s3">Name</div>
                <div className="col s3">Goals</div>
                <div className="col s3">Assists</div>
                <div className="col s3">Points</div>
            </div>
        )
        teamScoreboards.push(playerList)

        return (
            <div className="inside-container">
                {teamScoreboards}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = {
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(TeamStats);
