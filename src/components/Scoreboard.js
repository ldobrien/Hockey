import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadRosters, submitTeam} from '../store/actions/teamActions';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import './styles.css'

class Scoreboard extends Component {
    state ={
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps){
    }

    render() {
        console.log(this.props.chosenTeams)
        let teams = []
        if(!this.props.chosenTeams){
            console.log("NULL")
            return (
                <div>
                    
                </div>)
        }
        var keys = Object.keys(this.props.chosenTeams)

        for(var index = 0; index < keys.length; index++){
            var team = this.props.chosenTeams[keys[index]]
            teams.push(<p key={teams.length}>{team.email}</p>)
        }

        return (
            <div className="inside-container">
                {teams}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        chosenTeams: state.firestore.data.chosenTeam
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
, firestoreConnect([{collection: 'chosenTeam'}]))(Scoreboard);
