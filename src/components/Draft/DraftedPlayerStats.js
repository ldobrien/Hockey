import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import '../styles.css'

class DraftedPlayerStats extends Component {
    state ={
        forwardsNames: [],
        defenseNames: []
    }
    componentDidMount(){
        const forwardsNames = []
        const defenseNames = []
        this.props.forwards.forEach(player => {
            forwardsNames.push(player.fullName)
        })
        this.props.defense.forEach(player => {
            defenseNames.push(player.fullName)
        })
        this.setState({
            forwardsNames,
            defenseNames
        })
    }

    renderPlayers = (forwards, defense, index) => {
        let key = index
        let style = "row"
        return (
            <div className={style} key={key}>
                <div className="col s6">{forwards[index]}</div>
                <div className="col s6">{defense[index]}</div>
            </div>
        )
    }

    render() {
        const {entry} = this.props
        const players = []
        const forwards = []
        const defense = []
        entry.forEach(player => {
            if(this.state.forwardsNames.includes(player.slice(0,-1)) || this.state.forwardsNames.includes(player)){
                forwards.push(player)
            } else {
                defense.push(player)
            }
        })

        const playerHeader =
            (<div className="row">
                <div className="col s6 bold z-depth-1">Forwards</div>
                <div className="col s6 bold z-depth-1">Defense</div>
            </div>)
        let len = forwards.length > defense.length ? forwards.length : defense.length
        for(var i = 0; i < len; i++){
            players.push(this.renderPlayers(forwards, defense, i))
        }
    
        return (
            <div className="inside-container">
                <div className="card grey lighten-5">
                    <div className="card-content">
                       {playerHeader}
                        {players}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = {
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(DraftedPlayerStats);
