// draftOrder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftOrder, submitDraftBoard} from '../../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import 'react-autocomplete-input/dist/bundle.css';
import {Collapsible, CollapsibleItem} from 'react-materialize'
import DraftedPlayerStats from './DraftedPlayerStats';
import "./DraftBoard.css"


class DraftedTeam extends Component {
    state ={
        draftees: this.props.draftOrder,
        forwards: this.props.forwards,
        defense: this.props.defense,
        managers: []
    }

    componentDidMount(){
        this.props.loadDraftOrder()
    }

    componentDidUpdate(){
        if(this.state.draftees.length !== this.props.draftOrder.length){
            this.setState({
                draftees: this.props.draftOrder,
                managers: this.props.draftOrder.slice(0,8)
            })
        } else if (this.state.managers.length !== this.props.draftOrder.slice(0,8).length){
            this.setState({
                managers: this.props.draftOrder.slice(0,8)
            })
        }
    }

    render() {
        const draftedTeams = []
        let gmToPlayerMap = new Map()

        this.state.draftees.forEach((pick, index) => {
            if(pick.drafted !== undefined){
                if(gmToPlayerMap.has(pick.title)){
                    gmToPlayerMap.set(pick.title, [...gmToPlayerMap.get(pick.title), pick.drafted])
                } else {
                    gmToPlayerMap.set(pick.title, [pick.drafted])
                }
            }
        })

        this.state.managers.forEach((entry, index) => {
            let header = entry.title
            if(gmToPlayerMap.get(entry.title) !== undefined){
                draftedTeams.push(
                    <CollapsibleItem
                    expanded={false}
                    header={header}
                    node="div"
                    key={draftedTeams.length}
                    >
                        <DraftedPlayerStats 
                            key={draftedTeams.length} 
                            entry={gmToPlayerMap.get(entry.title)} 
                            forwards={this.state.forwards}
                            defense={this.state.defense}/>
                    </CollapsibleItem>)
            } else {
                draftedTeams.push(
                    <CollapsibleItem
                    expanded={false}
                    header={header}
                    node="div"
                    key={draftedTeams.length}
                    >
                    </CollapsibleItem>)
            }

        })

        return (
            <div className="inside-container">
            <div className="white">
            
            <div className="inner-container">
            <h5>Pool Rules</h5>
            <p>
            No Collusion!
            </p>
            <h5>Draft</h5>
            <p>
            1. Teams must draft 10 forwards, 5 defense, 3 teams
            </p>
            <p>
            2. Draft pick trades must be even on both sides (i.e. a 1st and 12th round pick in 
            exchange for a 2nd and 3rd round pick. 2 picks for 2 picks)
            </p>
            <h5>Post-Draft</h5>
            <p>
            1. After the draft, trades can be completed and do not need to follow the 10/5/3 roster format
            </p>
            <p>
            2. Post-Draft trades can be uneven in terms of numbers of players on each side (i.e. 2 for 1)
            </p>
            <p>
            3. Post-draft trades can only be between players that have been drafted. Undrafted players are not allowed to be traded for.
            </p>
            <p>
            4. If a player gets put on long term injury, they can be traded out for a previously 
            undrafted player. The injured player will not be allowed to be re-drafted and will 
            be out for the remained of our season.
            </p>
            <p>
            </p>
            </div>
            </div>
                <Collapsible accordion>
                    {draftedTeams}
                </Collapsible>
            </div>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        draftOrder: state.draftOrder,
        forwards: state.forwards,
        defense: state.defense,
    };
};

const mapDispatchToProps = {
    loadDraftOrder,
    submitDraftBoard
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(DraftedTeam);