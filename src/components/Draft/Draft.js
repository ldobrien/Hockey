import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveToDB} from '../../store/actions/teamActions'
import {loadForwards, loadDefense, getPlayerStats} from '../../store/actions/draftActions'
import {loadDraftOrder} from '../../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import '../styles.css'
import SortedDraftPlayerList from './SortedDraftPlayerList';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Draft extends Component {
    state ={
        forwards: this.props.forwards,
        defense: this.props.defense,
        draftees: this.props.draftOrder,
        owners: new Map(),
        forwardNames: [],
        defenseNames: [],
        currentlySelected: ""
    }

    componentDidMount(){
        if(this.props.draftOrder.length === 0){
            this.props.loadDraftOrder()
        } else {
            let draftees = this.props.draftOrder

            this.UpdateDraftPicks(draftees)
        }
    }

    componentDidUpdate(){
        if(this.props.draftOrder !== this.state.draftees){
            let draftees = this.props.draftOrder
            this.UpdateDraftPicks(draftees)
        }
    }

    UpdateDraftPicks = (draftees) => {
        let owners = new Map()
        let forwards = this.state.forwards
        let defense = this.state.defense

        draftees.forEach(pick => {
            if(owners.has(pick.title)){
                if(pick.drafted !== undefined){
                    owners.set(pick.title, [...owners.get(pick.title), pick.drafted])
                }  
            } else {
                if(pick.drafted === undefined){
                    owners.set(pick.title, [])
                } else {
                    owners.set(pick.title, [pick.drafted])
                }
            }
        })

        this.updateDrafted(owners, forwards, defense)
        this.setState({
            draftees,
            owners,
            forwards,
            defense
        })
    }

    updateDrafted = (owners, forwards, defense) => {
        let ownersCollection = Array.from(owners.values())
        ownersCollection.forEach(team => {
            team.forEach(pick => {
                let shortPick = pick.slice(0,-1)
                let fIndex = forwards.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
                if(fIndex !== -1){
                    forwards[fIndex].drafted = 1
                }
                let dIndex = defense.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
                if(dIndex !== -1){
                    defense[dIndex].drafted = 1
                }
            })
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

    onSelect = (owner) => {
        let team = this.state.owners.get(owner.value)
        let forwards = this.state.forwards
        let defense = this.state.defense
        if(this.state.currentlySelected !== "" && this.state.currentlySelected !== owner.value){
            let prevTeam = this.state.owners.get(this.state.currentlySelected)
            prevTeam.forEach(pick => {
                let shortPick = pick.slice(0,-1)
                let fIndex = forwards.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
                if(fIndex !== -1){
                    forwards[fIndex].drafted = 0
                }
                let dIndex = defense.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
                if(dIndex !== -1){
                    defense[dIndex].drafted = 0
                }
            })
        }
        this.updateDrafted(this.state.owners, forwards, defense)
        team.forEach(pick => {
            let shortPick = pick.slice(0,-1)
            let fIndex = forwards.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
            if(fIndex !== -1){
                forwards[fIndex].drafted = 2
            }
            let dIndex = defense.findIndex(i => i.fullName === pick || i.fullName ===shortPick) 
            if(dIndex !== -1){
                defense[dIndex].drafted = 2
            }
        })
        
        this.setState({
            forwards,
            defense,
            currentlySelected: owner.value
        })
    }

    render() {
        let {forwards, defense} = this.props

        if(forwards.length > 0){
            var forwardsSortedDivs = <SortedDraftPlayerList playerList={forwards} onClick={this.onClick} position="Forward"/>
        }
        if(defense.length > 0) {
            var defenseSortedDivs = <SortedDraftPlayerList playerList={defense} onClick={this.onClick} position="Defense" />
        }
        
        return (
            <div className="inside-container">
                <Dropdown options={Array.from(this.state.owners.keys())} onChange={this.onSelect} placeholder="Select an option" />
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
        defense: state.defense,
        draftOrder: state.draftOrder,
    };
};

const mapDispatchToProps = {
    saveToDB,
    loadForwards, 
    loadDefense,
    getPlayerStats,
    loadDraftOrder
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Draft);
