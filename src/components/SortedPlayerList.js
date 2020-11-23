import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './styles.css'
import Player from './Player';

class SortedPlayerList extends Component {
    state ={
        teamRoster: [],
        selectedPlayers: {},
    }

    render() {
        let sortedlist = this.props.playerList.sort((a, b) => a.fullName > b.fullName ? 1 : -1)
        var sortedlistDivs = []
        sortedlist.forEach(player => {
            sortedlistDivs.push(
                <Player onClick={(player) => this.props.onClick(player)} key={sortedlistDivs.length} highlightKeys={this.props.highlightKeys} player={player}/>)
        })
        return (
            <div className="inside-container">
                <Scrollbars style={{height: 500 }}>{sortedlistDivs}</Scrollbars>
            </div>
        )
    }
}

export default (SortedPlayerList);
