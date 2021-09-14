import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './styles.css'
import DraftPlayer from './DraftPlayer';

class SortedDraftPlayerList extends Component {
    state ={
    }

    render() {
        let sortedlist = this.props.playerList.sort((a, b) => {
            if(a.stats.stat.goals === undefined){
                return 0
            }
            if(((a.stats.stat.goals * 2) + a.stats.stat.assists) <= ((b.stats.stat.goals * 2) + b.stats.stat.assists)){
                return 1
            }
            return -1
        })
        var sortedlistDivs = []
        sortedlist.forEach((player, index) => {
            sortedlistDivs.push(
                <DraftPlayer onClick={(player) => this.props.onClick(player, index, this.props.position)} key={sortedlistDivs.length} highlightKeys={this.props.highlightKeys} player={player}/>)
        })
        return (
            <div className="inside-container">
                <Scrollbars style={{height: 500 }}>{sortedlistDivs}</Scrollbars>
            </div>
        )
    }
}

export default (SortedDraftPlayerList);
