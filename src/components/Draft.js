import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveToDB} from '../store/actions/teamActions'
import {loadForwards, loadDefense, getPlayerStats} from '../store/actions/draftActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import './styles.css'
import SortedDraftPlayerList from './SortedDraftPlayerList';

class Draft extends Component {
    state ={
        forwards: this.props.forwards,
        defense: this.props.defense,
    }

    componentDidMount(){
        this.setState({
            forwards: this.props.forwards,
            defense: this.props.defense
        })
    }

    onClick = (e, index, position) => {
        if(position === "Forward"){
            let forwards = this.state.forwards
            if(this.state.forwards[index].drafted === 1){
                forwards[index].drafted = 2
            } else if(this.state.forwards[index].drafted === 2) {
                forwards[index].drafted = 0
            } else {
                forwards[index].drafted = 1
            }
            this.setState({
                forwards
            })
        }
        if(position === "Defense"){
            let defense = this.state.defense
            if(this.state.defense[index].drafted === 1){
                defense[index].drafted = 2
            } else if(this.state.defense[index].drafted === 2) {
                defense[index].drafted = 0
            } else {
                defense[index].drafted = 1
            }
            this.setState({
                defense
            })
        }
    }

    render() {
        let forwards = this.props.forwards
        let defense = this.props.defense

        if(forwards.length > 0){
            var forwardsSortedDivs = <SortedDraftPlayerList playerList={forwards} onClick={this.onClick} position="Forward"/>
        }
        if(defense.length > 0) {
            var defenseSortedDivs = <SortedDraftPlayerList playerList={defense} onClick={this.onClick} position="Defense" />
        }
        
        return (
            <div className="inside-container">
                <div className="side-by-side-container">
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Forwards</h5>
                        {forwardsSortedDivs}
                    </div>
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Defence</h5>
                        {defenseSortedDivs}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        forwards: state.forwards,
        defense: state.defense
    };
};

const mapDispatchToProps = {
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
