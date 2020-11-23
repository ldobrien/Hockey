import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getPlayerPoints} from './PlayerStats'
import './styles.css'

class TeamStats extends Component {
    renderGoalie = (player) => {
        let points = getPlayerPoints(player)
        let key = player.name + this.props.index
        return (
            <div className="row" key={key}>
                <div className="col s2">{player.name}</div>
                <div className="col s2">{player.wins}</div>
                <div className="col s2">{player.shutouts}</div>
                <div className="col s2">{player.goals}</div>
                <div className="col s2">{player.assists}</div>
                <div className="col s2">{points}</div>
            </div>
        )
    }

    renderPlayers = (players) => {
        let points = getPlayerPoints(players)
        let key = players.name + this.props.index
        return (
            <div className="row" key={key}>
                <div className="col s3">{players.name}</div>
                <div className="col s3">{players.goals}</div>
                <div className="col s3">{players.assists}</div>
                <div className="col s3">{points}</div>
            </div>
        )
    }

    header = (title) => {
        return <div className="col s3 bold z-depth-1">{title}</div>
    }

    goalieHeader = (title) => {
        return <div className="col s2 bold z-depth-1">{title}</div>
    }

    render() {
        const {entry} = this.props
        const goalies = []
        const players = []
        const playerHeader =
            (<div className="row">
                <p className="bold">Players</p>
                {this.header("Name")}
                {this.header("Goals")}
                {this.header("Assists")}
                {this.header("Points")}
            </div>)
        const goalieHeaders = (
            <div className="row">
                <p className="bold">Goalies</p>
                {this.goalieHeader("Name")}
                {this.goalieHeader("Wins")}
                {this.goalieHeader("Shutouts")}
                {this.goalieHeader("Goals")}
                {this.goalieHeader("Assists")}
                {this.goalieHeader("Points")}
            </div>)
        entry.forEach(player => {
            if(player.position === "Goalie"){
                goalies.push(this.renderGoalie(player))
            } else {
                players.push(this.renderPlayers(player))
            }
        })
    
        return (
            <div className="inside-container">
                <div className="card grey lighten-5">
                    <div className="card-content">
                       {playerHeader}
                        {players}
                    </div>
                </div>
                
                <div className="card grey lighten-5">
                    <div className="card-content">
                        {goalieHeaders}
                        {goalies}
                    </div>
                </div>
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
