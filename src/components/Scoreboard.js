import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {loadScoreboard} from '../store/actions/scoreboardActions'
import { firestoreConnect } from 'react-redux-firebase';
import './styles.css'

class Scoreboard extends Component {
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
        if(this.props.chosenTeams !== prevProps.chosenTeams){
            this.props.loadScoreboard(this.props.chosenTeams)
            this.setState({
                scoreboard: this.props.scoreboard
            })
        }
        if(this.props.scoreboard !== prevProps.scoreboard){
            this.setState({
                scoreboard: this.props.scoreboard
            })
        }
    }

    goalieStats = (stats, name, position) => {
        let playerStats = {}
        playerStats["name"] = name
        playerStats["position"] = position
        playerStats['wins'] = stats.wins ? stats.wins : 0
        playerStats['losses'] = stats.losses ? stats.losses : 0
        playerStats['shutouts'] = stats.shutouts ? stats.shutouts : 0
        playerStats['goals'] = stats.goals ? stats.goals : 0
        playerStats['assists'] = stats.assists ? stats.assists : 0

        return playerStats
    }

    playerStats = (stats, name, position) => {
        let playerStats = {}
        playerStats["position"] = position
        playerStats["name"] = name
        playerStats['goals'] = stats.goals ? stats.goals : 0
        playerStats['assists'] = stats.assists ?  stats.assists : 0

        return playerStats
    }

    filterTeam = (team) => {
        const playerStatsArr = []
        const goalieStatsArr = []
        if(typeof team !== 'undefined') {
            for(var entry of team){
                let stats = entry.splits.length > 0 ? entry.splits[0].stat : []
                let player = entry.player
                if(player.position === "Goalie" ){
                    goalieStatsArr.push(this.goalieStats(stats, player.fullName, player.position))
                } else {
                    playerStatsArr.push(this.playerStats(stats, player.fullName, player.position))
                }
            }
        }
        return [...playerStatsArr, ...goalieStatsArr]
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
        if(Object.keys(this.state.scoreboard).length === 0){
            setTimeout(() => {
                this.setState({
                    scoreboard: this.props.scoreboard
                })
            }, 100)
            
        }
        
        let teams = []
        if(!this.props.chosenTeams){
            return (
                <div>
                    
                </div>)
        }
        var keys = Object.keys(this.props.chosenTeams)
        var teamDivs = []
        for(var index = 0; index < keys.length; index++){
            var teamDiv = this.filterTeam(this.state.scoreboard[keys[index]])
            var team = this.props.chosenTeams[keys[index]]

            teams.push(<div key={teams.length}>{team.email}</div>)
            teamDivs.push(teamDiv)
        }
        const teamScoreboards = []
        
        teamDivs.forEach((entry, index) => {
            let teamHeader = []
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

            teamHeader.push(
                <div className="row" key={teamHeader.length}>
                    <hr/>
                    <div>{teams[index]} ({teamTotalPoints})</div>
                    <p>Players</p>
                    <div className="col s3">Name</div>
                    <div className="col s3">Goals</div>
                    <div className="col s3">Assists</div>
                    <div className="col s3">Points</div>
                </div>
            )
            
            teamScoreboards.push(teamHeader)
            teamScoreboards.push(playerList)
            
        })

        return (
            <div className="inside-container">
                {teamScoreboards}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        chosenTeams: state.firestore.data.chosenTeam,
        scoreboard: state.scoreboard
    };
};

const mapDispatchToProps = {
    loadScoreboard
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Scoreboard);
