import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters, submitTeam} from '../store/actions/teamActions'
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import './styles.css'

class TeamPicker extends Component {
    state ={
        teamRoster: [],
        selectedPlayers: {},
        selectedForwards: 0,
        selectedDefense: 0,
        selectedGoalies: 0,
        numberOfForwards: 10,
        numberOfDefense: 5,
        numberOfGoalies: 3,
    }

    componentDidMount(){
        this.props.loadRosters()
        .then(this.setState({
            teamRoster: this.props.teamRoster
        }))
    }

    componentDidUpdate(prevProps){
        if(prevProps.teamRoster.length !== this.props.teamRoster.length){
            this.setState({
                teamRoster: this.props.teamRoster
            })
        }
    }

    selectionLogic = (field, deselect, limit, position) => {
        if(deselect){
            this.setState({
                [field]: this.state[field] - 1,
                error: ""
            })
        } 
        else if(this.state[field] === this.state[limit]){
            console.log("ERROR")
            this.setState({
                error: "Error: You have hit the limit of " + this.state[limit] + " " + position + " players"
            })
            return "Error: Limit hit"
        } 
        else {
            this.setState({
                [field]: this.state[field] + 1,
                error: ""
            })
        }
        return null
    }

    playerClicked = (player) => {
        let position = player.position
        let id = player.id
        var deselect = Object.keys(this.state.selectedPlayers).includes(id.toString())
        var error = null
        if(position === "Forward"){
            error = this.selectionLogic("selectedForwards", deselect, "numberOfForwards", position)
        } else if (position === "Defenseman"){
            error = this.selectionLogic("selectedDefense", deselect, "numberOfDefense", position)
        } else if (position === "Goalie"){
            error = this.selectionLogic("selectedGoalies", deselect, "numberOfGoalies", position)
        }
        if(error != null) {
            return
        }
        let selectedPlayers = this.state.selectedPlayers
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

    onSubmit = () => {
        this.props.submitTeam(this.state.selectedPlayers, this.props.auth)
    }

    sortDivs = (playerList) => {
        let sortedlist = playerList.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
        var sortedlistDivs = []
        sortedlist.forEach(player => {
            sortedlistDivs.push(
            <div 
                onClick={() => this.playerClicked(player)} 
                key={sortedlistDivs.length} 
                className={Object.keys(this.state.selectedPlayers).includes(player.id.toString()) ? "player-div green" : "player-div"}
                >
                {player.fullName}
                <span className="alignright">{player.team}</span>
            </div>)
        })
        return <Scrollbars style={{height: 500 }}>{sortedlistDivs}</Scrollbars>
    }

    render() {
        if(!this.props.auth.uid) return <Redirect to='/SignIn'/>
        let forwards = []
        let defense = []
        let goalies = []
        if(this.state.teamRoster) {
            this.state.teamRoster.forEach(player => {
                var currPlayer = {
                    fullName: player.fullName,
                    team: player.team,
                    position: player.position,
                    id: player.id
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
                <p className="red-text center">{this.state.error}</p>
                <div className="center">
                    <Button variant="contained" color="secondary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        teamRoster: state.teamRoster,
        auth: state.firebase.auth
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
, firestoreConnect([{collection: 'chosenTeam'}]))(TeamPicker);
