import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters, trade} from '../store/actions/teamActions'
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
        tradedOutPlayers: [],
        selectedPlayers: this.props.chosenTeams ? this.props.chosenTeams[this.props.auth.uid].team : {},
        highlight: []
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
        // I need to get the players who are traded out and add an archive of their points
        this.props.trade(this.state.selectedPlayers, this.props.auth, this.props.displayName)
    }

    selectionLogic = (deselect, tradeOut) => {
        if(this.state.tradeOut === this.state.tradeLimit && tradeOut && !deselect){
            this.setState({
                error: "Error: You have hit the trade limit of " + this.state.tradeLimit + " players"
            })
            return "Error: Limit hit"
        } 
        else if(this.state.tradeIn === this.state.tradeLimit && !tradeOut && !deselect){
            this.setState({
                error: "Error: You have hit the trade limit of " + this.state.tradeLimit + " players"
            })
            return "Error: Limit hit"
        } else {
            this.setState({
                error: ""
            })
            return null
        }
    }

    playerClicked = (player, tradeout) => {
        // tradeout is true for trade out; false for trade in
        let id = player.id.toString()
        let selectedPlayers = {...this.state.selectedPlayers}
        let tradedOutPlayers = this.state.tradedOutPlayers

        // trade out this will be select; trade in will be deselect
        let deselect = Object.keys(selectedPlayers).includes(id) && selectedPlayers[id].active
        let tradeIn = this.state.tradeIn
        let tradeOut = this.state.tradeOut
        let highlight = [...this.state.highlight]

        let selection = tradeout ? !deselect : deselect
        var error = this.selectionLogic(selection, tradeout)
        if(error != null) {
            return
        }
        
        if(deselect){
            let currPlayer = {...player}
            currPlayer.active = false
            selectedPlayers[id] = currPlayer
            if(tradeout){
                highlight.push(id)
                tradeOut++
                tradedOutPlayers.push(id)
            } else {
                const index = highlight.indexOf(id);
                if (index > -1) {
                    // TODO: these could be put into the same array
                    highlight.splice(index, 1);
                    // tradedInPlayers.splice(index, 1)
                }
                tradeIn--
            }
        }
        else {
            let currPlayer = {...player}
            currPlayer.active = true
            selectedPlayers[id] = currPlayer
            if(tradeout){
                const index = highlight.indexOf(id);
                if (index > -1) {
                    highlight.splice(index, 1);
                    tradedOutPlayers.splice(index, 1)
                }
                tradeOut--
            } else {
                tradeIn++
                highlight.push(id)
                // tradedInPlayers.push(id)
            }
        }

        this.setState({
            selectedPlayers,
            highlight,
            tradeIn,
            tradeOut,
            tradedOutPlayers
        })
    }

    render() {
        // console.log(this.state)
        if(!this.props.auth.uid) return <Redirect to='/SignIn'/>
        let team = []
        let players = []
        let teamplayersDivs = <div/>
        if(this.props.chosenTeams){
            team = this.props.chosenTeams[this.props.auth.uid].team
            let rawTeamArr = Object.values(team)
            let teamArr = rawTeamArr.filter(elem => elem.active)
            teamplayersDivs = <SortedPlayerList 
                                playerList={teamArr} 
                                onClick={(player)=>this.playerClicked(player, true)} 
                                highlightKeys={this.state.highlight}/>
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
            playersDivs = <SortedPlayerList playerList={players} onClick={(player)=>this.playerClicked(player, false)} highlightKeys={this.state.highlight}/>
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
    trade
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Trade);
