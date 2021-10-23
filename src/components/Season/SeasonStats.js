import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Dropdown from 'react-dropdown';
import {loadOwners} from '../../store/actions/draftOrderActions'
import {loadOwnerScores} from '../../store/actions/statsActions'
import 'react-dropdown/style.css';
import '../styles.css'
import {Collapsible, CollapsibleItem} from 'react-materialize'
import 'react-app-protect/dist/index.css'
// import {calculatePlayerIds} from "./PlayerIds"

class SeasonStats extends Component {
    state ={
        owners: new Map(),
        updateState: false,
        // info: []
    }

    componentDidMount(){
        this.props.loadOwners()
        // for(var i = 32; i <= 55; i++){
        //     fetch(`https://statsapi.web.nhl.com/api/v1/teams/` + i + `/?expand=team.roster`)
        //     .then(response => response.json())
        //     .then(json => 
        //         {
        //             if(json !== undefined && json.teams !== undefined && json.teams[0].roster !== undefined){
        //                 // console.log(json.teams[0].roster.roster)
        //                 this.setState({info: [...this.state.info, JSON.stringify(json.teams[0].roster.roster)]})
        //             } else {
        //                 // console.log("UNDEFINED", json, i)
        //             }

        //         }
        //     )
        // }

        
    }

    componentDidUpdate(prevProps){
        // console.log("UPDATING", this.props.owners !== undefined )
        if(this.props.owners !== undefined && this.state.updateState === false){
            this.props.loadOwnerScores(this.props.owners)
            this.setState({
                updateState: true,
                owners: this.props.owners,
            })
        }
        if(this.props.owners !== prevProps.owners){
            // this.props.loadOwnerScores(this.props.owners)
            this.setState({
                owners: this.props.owners
            // // }, () => console.log(JSON.stringify(calculatePlayerIds(this.state.owners.get("Lisa")))))
            })
        }
        if(Array.from(this.props.owners.keys()).length > 0){
            let altered = false
            Array.from(this.props.owners.keys()).forEach(owner => {
                let team = this.props.owners.get(owner)
                // console.log(owner, team)
                let prevTeam = prevProps.owners.get(owner)
                for(var i = 0; i < team.length; i++){
                    if(prevTeam === undefined || team[i].goals !== prevTeam[i].goals){
                        altered = true
                    }
                }
            })
            if(altered){
                this.setState({
                    owners: this.props.owners,
                    updateState: true
                })
            }
        }
    }

    header = (title) => {
        return <div className="col s3 bold z-depth-1">{title}</div>
    }

    renderPlayers = (player) => {
        let points = 2 * player.goals + player.assists | 0
        let key = player.id
        // let style = "row"
        let style = !player.active ? "grey row" : "row"
        return (
            <div className={style} key={key}>
                <div className="col s3">{player.fullName}</div>
                <div className="col s3">{player.goals | 0}</div>
                <div className="col s3">{player.assists | 0}</div>
                <div className="col s3">{points}</div>
            </div>
        )
    }

    renderOwner = (owner, points) => {
        let key = owner
        let style = "row"
        return(
            <div className={style} key={key}>
            <div className="col s3">{owner}</div>
            <div className="col s3"></div>
            <div className="col s3"></div>
            <div className="col s3">{points}</div>
        </div>)
    }

    loadScores = (players) => {
        var totalPoints = this.props.owners.get("totals")        
        if(totalPoints === undefined){
            return
        }

        let ownersMap = new Map([...this.props.owners.entries()].sort((a,b) => {
            return totalPoints[b[0]] - totalPoints[a[0]]}))

        var keys = Array.from(ownersMap.keys())
        var currteam = null
        var currtotal = 0

        for(let i = 0; i < keys.length; i++){
            var owner = keys[i]
            let teamStats = []

            currtotal = totalPoints[owner]
            teamStats.push(this.playerHeader())
            currteam = ownersMap.get(owner)

            if(owner !== "totals"){
                currteam.forEach(player => {
                    teamStats.push(this.renderPlayers(player))
                })
                players.push(
                    <CollapsibleItem
                    expanded={false}
                    header={this.renderOwner(owner, currtotal)}
                    node="div"
                    key={players.length}
                    >
                        <div>{teamStats}</div>
                    </CollapsibleItem>)
            }
        }
    }

    playerHeader = () => {
        return(<div className="row" key="header">
            <p className="bold">Players</p>
            {this.header("Name")}
            {this.header("Goals")}
            {this.header("Assists")}
            {this.header("Points")}
        </div>)
    }

    render() {
        if(Array.from(this.state.owners.keys()).length === 0) {
            return <div></div>
        }

        const players = []
        this.loadScores(players)
        return (
            <div className="inside-container">
                <div className="card grey lighten-5">
                    <div className="card-content">
                    <Collapsible accordion>
                        {players}
                    </Collapsible>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        owners: state.owners
    };
};

const mapDispatchToProps = {
    loadOwners,
    loadOwnerScores
    // loadPoints
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(SeasonStats);
