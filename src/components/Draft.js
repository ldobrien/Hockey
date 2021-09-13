import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitTeam, saveToDB} from '../store/actions/teamActions'
import {loadForwards, loadDefense, getPlayerStats} from '../store/actions/draftActions'
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import './styles.css'
import SortedDraftPlayerList from './SortedDraftPlayerList';

class Draft extends Component {
    state ={
        selectedPlayers: {},
        selectedForwards: 0,
        selectedDefense: 0,
        selectedGoalies: 0,
        numberOfForwards: 10,
        numberOfDefense: 5,
        numberOfGoalies: 3,
        forwards: this.props.forwards,
        defense: this.props.defense,
    }

    componentDidMount(){
        this.state.forwards.forEach(player => {
            this.props.getPlayerStats(player.id, 'Forward')
        })
        this.state.defense.forEach(player => {
            this.props.getPlayerStats(player.id, 'Defense')
        })
        this.setState({
            forwards: this.props.forwards,
            defense: this.props.defense
        })
    }

    onSubmit = () => {
    }

    render() {
        // if(!this.props.auth.uid) return <Redirect to='/SignIn'/>

        let forwards = this.props.forwards
        let defense = this.props.defense

        let filteredForwards = []
        forwards.forEach(player =>{
            let newPlayer = {}
            // newPlayer.
        })

        if(forwards.length > 0){
            var forwardsSortedDivs = <SortedDraftPlayerList playerList={forwards}/>
        }
        if(defense.length > 0) {
            var defenseSortedDivs = <SortedDraftPlayerList playerList={defense} />
        }
        
        return (
            <div className="inside-container">
                <div className="side-by-side-container">
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Forwards</h5>
                        {forwardsSortedDivs}
                        
                        <p className="green-text">
                            {this.state.numberOfForwards - this.state.selectedForwards} Forwards Remaining
                        </p>
                    </div>
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Defence</h5>
                        {defenseSortedDivs}
                        {/* {JSON.stringify(forwards)} */}
                        <p className="green-text">
                            {this.state.numberOfDefense - this.state.selectedDefense} Defense Remaining
                        </p>
                    </div>
                </div>
                <p className="red-text center">{this.state.error}</p>
                <div className="center">
                    {/* {status} */}
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
        topPlayers: state.topPlayers,
        auth: state.firebase.auth,
        displayName: state.firebase.profile.displayName,
        selectedTeams: state.selectedTeams,
        forwards: state.forwards,
        defense: state.defense
    };
};

const mapDispatchToProps = {
    submitTeam,
    saveToDB,
    loadForwards, 
    loadDefense,
    getPlayerStats
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Draft);
