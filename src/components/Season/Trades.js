import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Dropdown from 'react-dropdown';
import {loadOwners, updateOwners} from '../../store/actions/draftOrderActions'
import 'react-dropdown/style.css';
import '../styles.css'
import TeamPlayer from './TeamPlayer';
import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'
import {loadOwnerScores} from '../../store/actions/statsActions'

class Trade extends Component {
    state ={
        owners: new Map(),
        leftTradeTeam: [],
        rightTradeTeam: [],
        highlighted: [new Set(),new Set()],
        currentLeftOwner: "",
        currentRightOwner: "",
        updateState: false
    }

    componentDidMount(){
        this.props.loadOwners()
    }

    componentDidUpdate(prevProps){
        if(this.props.owners !== undefined && this.state.updateState === false){
            this.props.loadOwnerScores(this.props.owners)
            this.setState({
                updateState: true,
                owners: this.props.owners,
            })
        }
        else if(this.props.owners !== prevProps.owners){
            this.setState({
                owners: this.props.owners
            })
        }
    }

    onSelectLeft = (e) => {
        let leftTradeTeam = this.state.owners.get(e.value)
        this.setState({
            currentLeftOwner: e.value,
            leftTradeTeam
        })
    }

    onSelectRight = (e) => {
        let rightTradeTeam = this.state.owners.get(e.value)
        this.setState({
            currentRightOwner: e.value,
            rightTradeTeam
        })
    }

    onClick = (e, side) => {
        if(side === "left"){
            let selected = this.state.leftTradeTeam.findIndex(i => i.fullName === e && i.active)
            let previouslySelected = this.state.highlighted[0]
            if(previouslySelected.has(selected)){
                previouslySelected.delete(selected)
                this.setState({
                    highlighted: [previouslySelected, this.state.highlighted[1]]
                })
            } else {
                previouslySelected.add(selected)
                this.setState({
                    highlighted: [previouslySelected, this.state.highlighted[1]]
                })
            }
        } else {
            let selected = this.state.rightTradeTeam.findIndex(i => i.fullName === e && i.active)
            let previouslySelected = this.state.highlighted[1]
            if(previouslySelected.has(selected)){
                previouslySelected.delete(selected)
                this.setState({
                    highlighted: [this.state.highlighted[0], previouslySelected]
                })
            } else {
                previouslySelected.add(selected)
                this.setState({
                    highlighted: [this.state.highlighted[0], previouslySelected]
                })
            }
        }
    }

    onSubmit = () => {
        let newLeft = this.state.leftTradeTeam
        let newRight = this.state.rightTradeTeam
        let lefthighlights = Array.from(this.state.highlighted[0])
        let rightHighlights = Array.from(this.state.highlighted[1])

        rightHighlights.forEach(idx => {
            let newPlayer = {}
            this.deepCopy(newPlayer, this.state.rightTradeTeam[idx])
            newPlayer.excludedPoints = { 
                goals: this.state.rightTradeTeam[idx].goals, 
                assists: this.state.rightTradeTeam[idx].assists, 
                points: this.state.rightTradeTeam[idx].points
            }
            newPlayer.archivePoints = { goals: 0, assists: 0, points: 0}
            newLeft.push(newPlayer)
        })
        lefthighlights.forEach(idx => {
            let newPlayer = {}
            this.deepCopy(newPlayer, this.state.leftTradeTeam[idx])
            newPlayer.excludedPoints = { 
                goals: this.state.leftTradeTeam[idx].goals, 
                assists: this.state.leftTradeTeam[idx].assists, 
                points: this.state.leftTradeTeam[idx].points
            }
            newPlayer.archivePoints = { goals: 0, assists: 0, points: 0}
            newRight.push(newPlayer)
        })
        for(var i = rightHighlights.length - 1; i >= 0; i--){
            newRight[rightHighlights[i]].active = false
            newRight[rightHighlights[i]].archivePoints = {
                goals: newRight[rightHighlights[i]].goals, 
                assists: newRight[rightHighlights[i]].assists, 
                points: newRight[rightHighlights[i]].points,
            }
        }
        for(var j = lefthighlights.length - 1; j >= 0; j--){
            newLeft[lefthighlights[j]].active = false
            newLeft[lefthighlights[j]].archivePoints = {
                goals: newLeft[lefthighlights[j]].goals, 
                assists: newLeft[lefthighlights[j]].assists, 
                points: newLeft[lefthighlights[j]].points,
            }
        }

        let leftOwner = this.state.currentLeftOwner
        let rightOwner = this.state.currentRightOwner
        this.setState(prevState => ({ 
            highlighted: [new Set(),new Set()],
            owners: new Map([...prevState.owners, [this.state.currentLeftOwner, newLeft], [this.state.currentRightOwner, newRight]]) 
          }));

        this.props.updateOwners([leftOwner, newLeft], [rightOwner, newRight])
    }

    deepCopy = (newPlayer, oldPlayer) => {
        newPlayer.fullName = oldPlayer.fullName
        newPlayer.id = oldPlayer.id
        newPlayer.active = oldPlayer.active
        newPlayer.points = oldPlayer.points
        newPlayer.goals = oldPlayer.goals
        newPlayer.assists = oldPlayer.assists
        newPlayer.archivePoints = {...oldPlayer.archivePoints}
        newPlayer.excludedPoints = oldPlayer.excludedPoints
    }

    formatArray = (array, side) => {
        let highlightKeys=[]
        if(side === "left"){
            highlightKeys = Array.from(this.state.highlighted[0])

        } else {
            highlightKeys = Array.from(this.state.highlighted[1])
        }
        let formatted = []
        array.forEach((elem, index) => {
            formatted.push(<TeamPlayer active={elem.active} onClick={(e) => this.onClick(e, side)} idx={index} highlightKeys={highlightKeys} player={elem.fullName} key={formatted.length}/>)
        })
        return formatted
    }

    render() {
        let owners = Array.from(this.state.owners.keys()) 
        return (
            <Protect sha512='fa3ccb87a8c525d54c2c087df3524db8880ecccdb295b5aac7977cbc741a490b36eaea81a9f4fdeadc70c917ca3086deb7432ac0011c34861aa4ae71c69a2ec9'>
            <div className="inside-container">
                <div className="side-by-side-container">
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Trade</h5>
                        <Dropdown options={owners} onChange={this.onSelectLeft}placeholder="Select an option" />
                        {this.formatArray(this.state.leftTradeTeam, "left")}
                        </div>
                    <div className="side-container card grey lighten-5">
                        <h5 className="center">Trade</h5>
                        <Dropdown options={owners} onChange={this.onSelectRight} placeholder="Select an option" />
                        {this.formatArray(this.state.rightTradeTeam, "right")}
                    </div>
                </div>
                <p className="red-text center">{this.state.error}</p>
                <div className="center">
                    <Button variant="contained" color="secondary" onClick={this.onSubmit}>
                        Trade
                    </Button>
                </div>
            </div>
            </Protect>
        )
    }
}

const mapStateToProps = state => {
    return {
        owners: state.owners
    };
};

const mapDispatchToProps = {
    loadOwners,
    updateOwners,
    loadOwnerScores
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Trade);
