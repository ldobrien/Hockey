import React, { Component } from 'react';
import './styles.css'

class DraftPlayer extends Component {
    render() {
        let stats = this.props.player.stats ? this.props.player.stats.stat : ""
        // console.log(this.props.player.stats, stats)
        var goals =  ""
        var assists =  "" 
        var stat = ""
        if(stats !== ""){
            goals = stats.goals ? stats.goals : ""
            assists = stats.assists ? stats.assists : ""
            if(goals !== "" && assists !== ""){
                stat = goals + ", " + assists
            } 
            else if (goals == "" && assists == ""){
                stat = 0
            }
            else {
                stat = goals + " " + assists
            }
            
        }
        
        return (
            <div className="player-div">
                <div className="alignleft">{this.props.player.fullName}</div>
                <div className="alignright">{stat}</div>
            </div>
        )
    }
}

export default (DraftPlayer);
