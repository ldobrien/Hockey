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
        
        console.log("STATE", this.props.chosenTeam)
        return (
            <div className="inside-container">
                
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        chosenTeam: state.firestore.data.chosenTeam
    };
};

const mapDispatchToProps = {
    loadRosters,
    submitTeam
};

export default compose(
    // firestoreConnect(() => ['chosenTeam']),
    
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Scoreboard);
