import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters, submitTeam} from '../store/actions/teamActions'
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';
import './styles.css'

class TeamPicker extends Component {
    state ={
        teamRoster: [],
        selectedPlayers: [],
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
        if(prevProps.teamRoster !== this.props.teamRoster){
            this.setState({
                teamRoster: this.props.teamRoster
            })
        }
    }

    playerClicked = (position, id) => {
        // TODO: Need to limit the number of players they can select
        var deselect = this.state.selectedPlayers.includes(id)
        if(position === "Forward"){
            if(deselect){
                this.setState({
                    selectedForwards: this.state.selectedForwards -1
                })
            } 
            else if(this.state.numberOfForwards === this.state.selectedForwards){
                console.log("ERROR")
                return
            } 
            else {
                this.setState({
                    selectedForwards: this.state.selectedForwards + 1
                })
            }
        } else if (position === "Defenseman"){
            if(deselect){
                this.setState({
                    selectedDefense: this.state.selectedDefense -1
                })
            } 
            else if(this.state.numberOfDefense === this.state.selectedDefense){
                console.log("ERROR")
                return
            } 
            else {
                this.setState({
                    selectedDefense: this.state.selectedDefense + 1
                })
            }
        } else if (position === "Goalie"){
            if(deselect){
                this.setState({
                    selectedGoalies: this.state.selectedGoalies -1
                })
            } 
            else if(this.state.numberOfGoalies === this.state.selectedGoalies){
                console.log("ERROR")
                return
            } 
            else {
                this.setState({
                    selectedGoalies: this.state.selectedGoalies + 1
                })
            }
        }
        var selectedPlayers = this.state.selectedPlayers.includes(id) 
            ? this.state.selectedPlayers.filter(player => player !== id) 
            : [...this.state.selectedPlayers, id]
        
        this.setState({
            selectedPlayers
        })
    }

    onSubmit = () => {
        this.props.submitTeam(this.state.selectedPlayers)
    }

    sortDivs = (playerList) => {
        let sortedlist = playerList.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
        var sortedlistDivs = []
        sortedlist.forEach(player => {
            sortedlistDivs.push(
            <div 
                onClick={() => this.playerClicked(player.position, player.id)} 
                key={sortedlistDivs.length} 
                className={this.state.selectedPlayers.includes(player.id) ? "player-div green" : "player-div"}
                >
                {player.fullName}
                <span className="alignright">{player.team}</span>
            </div>)
        })
        return <Scrollbars style={{height: 500 }}>{sortedlistDivs}</Scrollbars>
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
        teamRoster: state.teamRoster
    };
};

const mapDispatchToProps = {
    loadRosters,
    submitTeam
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamPicker);
