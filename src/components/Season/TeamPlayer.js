import React, { Component } from 'react';
import '../styles.css'

class TeamPlayer extends Component {

    render() {
        
        if(this.props.active === false){
            return (
                <div 
                    className="player-div crossout"
                    >
                    {this.props.player}
                </div>
            )
        }
        return (
            <div 
                onClick={() => this.props.onClick(this.props.player)}
                className={this.props.highlightKeys.includes(this.props.idx) ? "player-div green" : "player-div"}
                >
                {this.props.player}
            </div>
        )
    }
}

export default (TeamPlayer);
