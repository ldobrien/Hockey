// draftOrder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftOrder, submitDraftBoard, submitDraftedTeams} from '../../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import './DraftBoard.css'
import DraftPlayers from './DraftPlayers';
import DraftGoalies from './DraftGoalies';

class DraftBoard extends Component {

    render() {
        return (
            <div>
            {/* <DraftPlayers /> */}
            <DraftGoalies />
            </div>
        )
    }
    
}

export default DraftBoard;