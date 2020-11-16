import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {loadScoreboard} from '../store/actions/scoreboardActions'
import { firestoreConnect } from 'react-redux-firebase';
import TeamStats from './TeamStats'
import {getPlayerPoints} from './PlayerStats'
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'
import './styles.css'

class Scoreboard extends Component {
    state ={
        scoreboard: this.props.scoreboard,
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

    render() {
        if(!this.props.chosenTeams){
            return (
                <div>
                    
                </div>)
        }

        const teamScoreboards = []
        const teams = []

        var keys = Object.keys(this.props.chosenTeams)
        var teamDivs = []

        for(var index = 0; index < keys.length; index++){
            var teamDiv = this.filterTeam(this.state.scoreboard[keys[index]])
            var team = this.props.chosenTeams[keys[index]]
            teams.push(team.displayName)
            teamDivs.push(teamDiv)
        }
        
        teamDivs.forEach((entry, index) => {
            let teamPoints = 0
            entry.forEach(elem => {
                teamPoints += getPlayerPoints(elem)
            })
            let header = teams[index] + " (" + teamPoints + ")"
            teamScoreboards.push(
                <CollapsibleItem
                expanded={false}
                header={header}
                node="div"
                key={teamScoreboards.length}
                >
                    <TeamStats  key={teamScoreboards.length} entry={entry}/>
                </CollapsibleItem>)
        })

        return (
            <div className="inside-container">
                <Collapsible accordion>
                    {teamScoreboards}
                </Collapsible>
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
