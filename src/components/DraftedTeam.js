// draftOrder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftOrder, submitDraftBoard} from '../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import 'react-autocomplete-input/dist/bundle.css';
import {Collapsible, CollapsibleItem} from 'react-materialize'
import DraftedPlayerStats from './DraftedPlayerStats';


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