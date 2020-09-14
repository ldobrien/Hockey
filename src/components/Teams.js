import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadTeams} from '../store/actions/teamActions'
/*
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
class Teams extends Component {
    state ={
        teams: []
    }
    componentDidMount(){
        this.props.loadTeams()
        .then(this.setState({
            teams: this.props.teams
        }))
    }

    componentDidUpdate(prevProps){
        if(prevProps.teams !== this.props.teams){
            this.setState({
                teams: this.props.teams
            })
        }
    }
    render() {
        console.log(this.state.teams)
        let MetropolitanTeams = []
        let AtlanticTeams = []
        let CentralTeams = []
        let PacificTeams = []
        if(this.state.teams) {
            this.state.teams.forEach(team => {
                if(team.division.name === "Metropolitan"){
                    MetropolitanTeams.push(
                    <div className="card" key={MetropolitanTeams.length}>{team.name} 
                        <span className="right">{team.firstYearOfPlay}</span>
                    </div>)
                } else if(team.division.name === "Atlantic"){
                    AtlanticTeams.push(
                    <div className="card" key={AtlanticTeams.length}>{team.name}
                        <span className="right">{team.firstYearOfPlay}</span>
                    </div>)
                } else if(team.division.name === "Central"){
                    CentralTeams.push(
                    <div className="card" key={CentralTeams.length}>{team.name}
                        <span className="right">{team.firstYearOfPlay}</span>
                    </div>)
                } else if(team.division.name === "Pacific"){
                    PacificTeams.push(
                    <div className="card" key={PacificTeams.length}>{team.name}
                        <span className="right">{team.firstYearOfPlay}</span>
                    </div>)
                }
            })
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">Teams</div>
                    <div className="col s6"><h5 className="center">Metro</h5> {MetropolitanTeams}</div>
                    <div className="col s6"><h5 className="center">Atlantic</h5> {AtlanticTeams}</div>
                    <div className="col s6"><h5 className="center">Central</h5> {CentralTeams}</div>
                    <div className="col s6"><h5 className="center">Pacific</h5> {PacificTeams}</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        teams: state.teams,
    };
};

const mapDispatchToProps = {
    loadTeams
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Teams);

