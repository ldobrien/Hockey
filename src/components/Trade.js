import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters, submitTeam} from '../store/actions/teamActions'
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import SortedPlayerList from './SortedPlayerList';

import './styles.css'

class Trade extends Component {
    state ={
        tradeOut: 0,
        tradeIn: 0,
        // The trade limit needs to come in from the db and should be decremented based on the players traded
        tradeLimit: 5,
        teamRoster: [],
        tradedOutPlayers: {},
        selectedPlayers: this.props.chosenTeams ? this.props.chosenTeams[this.props.auth.uid].team : {},
    }

    componentDidMount(){
        this.props.loadRosters()
        .then(this.setState({
            teamRoster: this.props.teamRoster,
            teamTradeRoster: this.props.chosenTeams
        }))
    }

    componentDidUpdate(prevProps){
        if(prevProps.chosenTeams !== this.props.chosenTeams){
            this.setState({
                ...this.state,
                selectedPlayers: this.props.chosenTeams[this.props.auth.uid].team
            })
        }
        if(prevProps.teamRoster.length !== this.props.teamRoster.length){
            this.setState({
                ...this.state,
                teamRoster: this.props.teamRoster,
            })
        }
    }

    onSubmit = () => {
        if(this.state.tradeIn > this.state.tradeOut){
            this.setState({
                error: "Cannot trade in more players than are traded out"
            })
            return
        }
        this.props.submitTeam(this.state.selectedPlayers, this.props.auth, this.props.displayName)
    }

    selectionLogic = (deselect, tradeOut) => {
        if(deselect){
            if(tradeOut){
                this.setState({
                    tradeOut: this.state.tradeOut - 1,
                    error: ""
                })
            } else {
                this.setState({
                    tradeIn: this.state.tradeIn - 1,
                    error: ""
                })
            }
        } 
        else if(this.state.tradeOut === this.state.tradeLimit && tradeOut){
            this.setState({
                error: "Error: You have hit the trade limit of " + this.state.tradeLimit + " players"
            })
            return "Error: Limit hit"
        } 
        else if(this.state.tradeIn === this.state.tradeLimit && !tradeOut){
            this.setState({
                error: "Error: You have hit the trade limit of " + this.state.tradeLimit + " players"
            })
            return "Error: Limit hit"
        } 
        else {
            if(tradeOut){
                this.setState({
                    tradeOut: this.state.tradeOut + 1,
                    error: ""
                })
            } else {
                this.setState({
                    tradeIn: this.state.tradeIn + 1,
                    error: ""
                })
            }
        }
        return null
    }

    playerClicked = (player) => {
        let id = player.id
        var deselect = Object.keys(this.state.selectedPlayers).includes(id.toString())
        var error = this.selectionLogic(deselect, false)
        if(error != null) {
            return
        }
        let selectedPlayers = {...this.state.selectedPlayers}
        if(Object.keys(this.state.selectedPlayers).includes(id.toString())){
            delete selectedPlayers[id]
        }
        else {
            selectedPlayers[id] = player
        }
        
        this.setState({
            selectedPlayers
        })
    }

    tradeOutClicked = (player) => {
        let id = player.id
        var deselect = Object.keys(this.state.selectedPlayers).includes(id.toString())
        var error = this.selectionLogic(!deselect, true)
        if(error != null) {
            return
        }
        let selectedPlayers = {...this.state.selectedPlayers}
        let tradedOutPlayers = {...this.state.tradedOutPlayers}
        if(Object.keys(this.state.selectedPlayers).includes(id.toString())){
            delete selectedPlayers[id]
            tradedOutPlayers[id] = player
        }
        else {
            selectedPlayers[id] = player
            delete tradedOutPlayers[id]
        }
        
        this.setState({
            selectedPlayers,
            tradedOutPlayers
        })
    }

    render() {
        if(!this.props.auth.uid) return <Redirect to='/SignIn'/>
        let team = []
        let players = []
        let teamplayersDivs = <div/>
        if(this.props.chosenTeams){
            team = this.props.chosenTeams[this.props.auth.uid].team
            let teamArr = Object.values(team)
            teamplayersDivs = <SortedPlayerList 
                                playerList={teamArr} 
                                onClick={this.tradeOutClicked} 
                                highlightKeys={Object.keys(this.state.tradedOutPlayers)}/>
            let chosenTeamIdSet = new Set()
            teamArr.forEach(player => {
                chosenTeamIdSet.add(player.id)
            })
            if(this.state.teamRoster) {
                this.state.teamRoster.forEach(player => {
                    if(!chosenTeamIdSet.has(player.id)){
                        var currPlayer = {
                            fullName: player.fullName,
                            team: player.team,
                            position: player.position,
                            id: player.id
                        }
                        players.push(currPlayer)
                    }
                })
            }
        }
        
        
        
        var playersDivs = <div/>
        if(players.length > 0){
            playersDivs = <SortedPlayerList playerList={players} onClick={this.playerClicked} highlightKeys={Object.keys(this.state.selectedPlayers)}/>

        }
        
        return (
            <div className="inside-container">
                <div className="side-by-side-container">
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Trade out</h5>
                        {teamplayersDivs}
                        </div>
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Trade In</h5>
                        {playersDivs}
                    </div>
                </div>
                <p className="red-text center">{this.state.error}</p>
                <div className="center">
                    <Button variant="contained" color="secondary" onClick={this.onSubmit}>
                        Trade
                    </Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        teamRoster: state.teamRoster,
        auth: state.firebase.auth,
        displayName: state.firebase.profile.displayName,
        chosenTeams: state.firestore.data.chosenTeam,
    };
};

const mapDispatchToProps = {
    loadRosters,
    submitTeam
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Trade);
