import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import './styles.css'

class TeamStats extends Component {
    state ={
        scoreboard: this.props.scoreboard,
        goalValue: 2,
        assistValue: 1,
        winValue: 1,
        shutoutValue: 1,
        goalieGoalValue: 10,
        goalieAssistValue: 1
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps){
    }

    renderPlayers = (players) => {
        let points = this.getPlayerPoints(players)
        if(players.position === "Goalie"){
            return (
                <div className="row" key={players.name}>
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

    getPlayerPoints = (player) => {
        if(player.position === "Goalie"){
            return player.goals * this.state.goalieGoalValue 
            + player.assists * this.state.goalieAssistValue
            + player.wins * this.state.winValue
            + player.shutouts * this.state.shutoutValue
        }
        return player.goals * this.state.goalValue + player.assists * this.state.assistValue
    }

    render() {
        const {entry, teams, index} = this.props

        const teamScoreboards = []
        let teamTotalPoints = 0
        let display = false

        let playerList = []
        entry.forEach(player => {
            teamTotalPoints += this.getPlayerPoints(player)
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
                <div>{teams[index]} ({teamTotalPoints})</div>
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
