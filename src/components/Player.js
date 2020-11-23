import React, { Component } from 'react';
import './styles.css'

class Player extends Component {

    render() {
        return (
            <div 
                onClick={() => this.props.onClick(this.props.player)}
                className={this.props.highlightKeys.includes(this.props.player.id.toString()) ? "player-div green" : "player-div"}
                >
                {this.props.player.fullName}
                <span className="alignright">{this.props.player.team}</span>
            </div>
        )
    }
}

export default (Player);
