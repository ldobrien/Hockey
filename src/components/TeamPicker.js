import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadTeamsRoster, loadTeamIds} from '../store/actions/teamActions'
import './styles.css'

class TeamPicker extends Component {
    state ={
        teamIds: [],
        teamRoster: []
    }
    componentDidMount(){
        this.props.loadTeamIds()
        .then(this.setState({
            teamIds: this.props.teamIds
        }))
        this.props.loadTeamsRoster(1)
        .then(this.setState({
            teamRoster: this.props.teamRoster
        }))
    }

    componentDidUpdate(prevProps){
        // TODO: Figure out how to clean this up
        if(prevProps.teamRoster != this.props.teamRoster){
            this.setState({
                teamRoster: [...this.state.teamRoster, ...this.props.teamRoster]
            })
        }
        if(prevProps.teamIds !== this.props.teamIds){
            this.setState({
                ...this.state,
                teamIds: this.props.teamIds
            }, () => {
                this.state.teamIds.forEach(teamId => {
                    this.setState({
                        teamRoster: []
                    })
                    this.props.loadTeamsRoster(teamId)
                })
            })
        }
    }
    render() {
        let forwards = []
        let defence = []
        let goalies = []
        if(this.state.teamRoster) {
            this.state.teamRoster.forEach(player => {
                if(player.position.type === "Forward"){
                    forwards.push(player.person.fullName)
                } else if (player.position.type === "Defenseman"){
                    defence.push(<p>{player.person.fullName}</p>)
                } else if (player.position.type === "Goalie"){
                    goalies.push(<p>{player.person.fullName}</p>)
                }
            })
        }
        console.log("Players", forwards)
        console.log("Defence", defence)
        console.log("goalies", goalies)
        let forwardsSorted = forwards.sort()
        var forwardsSortedDivs = []
        forwardsSorted.forEach(player => {
            forwardsSortedDivs.push(<p>{player}</p>)
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">Team Picker</div>
                    <div className="col s6"><h5 className="center">Forwards</h5> {forwardsSortedDivs}</div>
                    <div className="col s6"><h5 className="center">Defence</h5> {defence}</div>
                    <div className="col s6"><h5 className="center">Goalies</h5> {goalies}</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        teamRoster: state.teamRoster,
        teamIds: state.teamIds
        // teams: state.teams
    };
};

const mapDispatchToProps = {
    loadTeamsRoster,
    loadTeamIds
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamPicker);
/*


GET https://statsapi.web.nhl.com/api/v1/people/ID/stats?stats=statsSingleSeason&season=19801981
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.",
  "stats" : [ {
    "type" : {
      "displayName" : "statsSingleSeason"
    },
    "splits" : [ {
      "season" : "20162017",
      "stat" : {
        "timeOnIce" : "1506:01",
        "assists" : 36,
        "goals" : 33,
        "pim" : 50,
        "shots" : 313,
        "games" : 82,
        "hits" : 216,
        "powerPlayGoals" : 17,
        "powerPlayPoints" : 26,
        "powerPlayTimeOnIce" : "305:21",
        "evenTimeOnIce" : "1198:26",
        "penaltyMinutes" : "50",
        "faceOffPct" : 0.0,
        "shotPct" : 10.5,
        "gameWinningGoals" : 7,
        "overTimeGoals" : 2,
        "shortHandedGoals" : 0,
        "shortHandedPoints" : 0,
        "shortHandedTimeOnIce" : "02:14",
        "blocked" : 29,
        "plusMinus" : 6,
        "points" : 69,
        "shifts" : 1737,
        "timeOnIcePerGame" : "18:21",
        "evenTimeOnIcePerGame" : "14:36",
        "shortHandedTimeOnIcePerGame" : "00:01",
        "powerPlayTimeOnIcePerGame" : "03:43"
      }
    } ]
  } ]
}


Team:
{
    "id" : 1,
    "name" : "New Jersey Devils",
    "link" : "/api/v1/teams/1",
    "venue" : {
      "name" : "Prudential Center",
      "link" : "/api/v1/venues/null",
      "city" : "Newark",
      "timeZone" : {
        "id" : "America/New_York",
        "offset" : -5,
        "tz" : "EST"
      }
    },
    "abbreviation" : "NJD",
    "teamName" : "Devils",
    "locationName" : "New Jersey",
    "firstYearOfPlay" : "1982",
    "division" : {
      "id" : 18,
      "name" : "Metropolitan",
      "link" : "/api/v1/divisions/18"
    },
    "conference" : {
      "id" : 6,
      "name" : "Eastern",
      "link" : "/api/v1/conferences/6"
    },
    "franchise" : {
      "franchiseId" : 23,
      "teamName" : "Devils",
      "link" : "/api/v1/franchises/23"
    },
    "shortName" : "New Jersey",
    "officialSiteUrl" : "http://www.truesince82.com",
    "franchiseId" : 23,
    "active" : true
  }
*/
