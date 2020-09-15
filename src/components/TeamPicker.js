import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters} from '../store/actions/teamActions'
import { Scrollbars } from 'react-custom-scrollbars';
import './styles.css'

class TeamPicker extends Component {
    state ={
        teamRoster: []
    }
    componentDidMount(){
        this.props.loadRosters()
        .then(this.setState({
            teamRoster: this.props.teamRoster
        }))
    }

    componentDidUpdate(prevProps){
        if(prevProps.teamRoster != this.props.teamRoster){
            this.setState({
                teamRoster: this.props.teamRoster
            })
        }
    }

    sortDivs = (playerList) => {
        let sortedlist = playerList.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
        var sortedlistDivs = []
        console.log(sortedlist)
        sortedlist.forEach(player => {
            sortedlistDivs.push(
            <div key={sortedlistDivs.length} className="player-div">
                {player.fullName}
                <span class="alignright">{player.team}</span>
            </div>)
        })
        console.log(sortedlistDivs)
        return <Scrollbars style={{height: 600 }}>{sortedlistDivs}</Scrollbars>
    }

    render() {
        let forwards = []
        let defense = []
        let goalies = []
        if(this.state.teamRoster) {
            this.state.teamRoster.forEach(player => {
                var currPlayer = {
                    fullName: player.fullName,
                    team: player.team,
                    position: player.position
                }
                if(player.position === "Forward"){
                    forwards.push(currPlayer)
                } else if (player.position === "Defenseman"){
                    defense.push(currPlayer)
                } else if (player.position === "Goalie"){
                    goalies.push(currPlayer)
                }
            })
        }
        if(forwards.length > 0){
            var forwardsSortedDivs = this.sortDivs(forwards)
        }
        if(defense.length > 0) {
            var defenseSortedDivs = this.sortDivs(defense)
        }
        if(goalies.length > 0){
            var goaliesSortedDivs = this.sortDivs(goalies)
        }
        
        return (
            <div className="inside-container">
                    <div className="side-by-side-container">
                        <div className="side-container">
                            <h5 className="center">Forwards</h5>
                            {forwardsSortedDivs}</div>
                        <div className="side-container">
                            <h5 className="center">Defence</h5>
                            {defenseSortedDivs}
                        </div>
                        <div className="side-container">
                            <h5 className="center">Goalies</h5> {goaliesSortedDivs}
                        </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        teamRoster: state.teamRoster
    };
};

const mapDispatchToProps = {
    loadRosters
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
