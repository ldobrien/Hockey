import React, { Component } from 'react';
import './styles.css'

class DraftPlayer extends Component {
    render() {
        let stats = this.props.player.stats ? this.props.player.stats.stat : ""
        // console.log(this.props.player.stats, stats)
        var goals =  0
        var assists =  0
        var totalFantasyPoints = 0
        var stat = ""
        if(stats !== ""){
            goals = stats.goals ? stats.goals : 0
            assists = stats.assists ? stats.assists : 0
            totalFantasyPoints = 2 * goals + assists
        }
        let className = "player-div"
        if(this.props.player.drafted !== undefined && this.props.player.drafted === 1){
            className= "player-div-selected"
        }
        else if(this.props.player.drafted !== undefined && this.props.player.drafted === 2){
            className= "player-div-drafted"
        }
        return (
            <div className={className} onClick={() => this.props.onClick(this.props.player)}>
                <div className="alignleft">{this.props.player.fullName} <span className="alignright">{totalFantasyPoints}</span></div>
            </div>
        )
    }
}

export default (DraftPlayer);
