import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Dropdown from 'react-dropdown';
import {loadOwners, updateOwners, submitDraftedTeams} from '../../store/actions/draftOrderActions'
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
        updateState: false,
        allPlayers: new Set(),
        once: true,
        stats: []
    }

    componentDidMount(){
    
        // fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
        // .then(response => response.json())
        // .then(json => {
        //     json.teams.forEach(team => {
        //         fetch(`https://statsapi.web.nhl.com/api/v1/teams/`+team.id+`?expand=team.roster`)
        //         .then(response => response.json())
        //         .then(json => {
        //             // const stats = []
        //             let roster = json.teams[0].roster.roster
        //             let ids = roster.map(i => i.person.id)

        //             ids.forEach((id, index) => {
        //                 fetch(`https://statsapi.web.nhl.com/api/v1/people/`+id+'/stats?stats=statsSingleSeason&season=20212022')
        //                 .then(response => response.json())
        //                 .then(json => {
                            
        //                     if(json.stats[0].splits[0]){
        //                         // console.log(json.stats[0].splits[0])
        //                         const currPlayerStats = json.stats[0].splits[0].stat
        //                         // console.log(id, roster[index], json.stats[0].splits[0].stat)
        //                         let archived = { 
        //                             goals: currPlayerStats.goals | 0, 
        //                             assists: currPlayerStats.assists | 0, 
        //                         }
        //                         archived.points = 2 * archived.goals + archived.assists
        //                         let newPlayer = {
        //                             fullName: roster[index].person.fullName,
        //                             active: true,
        //                             id: id,
        //                             archivePoints: archived,
        //                             excludedPoints: { goals: 0, assists: 0, points: 0},
        //                             points: 0,
        //                             goals: 0,
        //                             assists: 0
        //                         }
        //                         // stats.push(newPlayer)
                                
        //                         let newStats = [...this.state.stats, newPlayer]
        //                         // let newStats = [...this.state.stats, ...stats]
        //                         this.setState({
        //                             stats: newStats
        //                         })
        //                     }
        //                     else {
        //                         // console.log(json)
        //                     }
        //                 })
                        
        //             })
        //         })
        //     })
        // })


        this.props.loadOwners()
        // let allPlayers = new Set()
        // this.state.stats.forEach(player => {
        //     allPlayers.add(player.fullName)
        // })
        // // forwards.forEach(player => {
        // //     allPlayers.add(player.fullName)
        // // })
        // // defense.forEach(player => {
        // //     allPlayers.add(player.fullName) 
        // // })
        // this.setState({
        //     allPlayers,
        // })
    }

    componentDidUpdate(prevProps, prevState){
        // if(this.state.stats.length !== prevState.stats.length){
        //     let allPlayers = new Set()
        //     this.state.stats.forEach(player => {
        //         allPlayers.add(player.fullName)
        //     })
        //     this.setState({
        //         allPlayers,
        //     })
        // }
        if(this.props.owners !== undefined && this.state.updateState === false){
            console.log("OWNERS", this.props.owners)
            this.props.loadOwnerScores(this.props.owners)
            this.setState({
                updateState: true,
                owners: this.props.owners,
            })
        }
        else if(this.props.owners !== prevProps.owners){
            // let allPlayers = this.state.allPlayers
            // let keys = Array.from(this.props.owners.keys())
            // for(var i = 0; i < keys.length; i++){
            //     if(keys[i] === "totals" || keys[i] === "undrafted"){
            //         continue
            //     }
            //     let team = this.props.owners.get(keys[i])
            //     team.forEach(player => {
            //         allPlayers.delete(player.fullName)
            //         allPlayers.delete(player.fullName + " ")
            //     })
            // }
            // let allPlayersArr = []
            // Array.from(allPlayers).forEach(player => {
            //     let currPlayer = this.state.stats.find(i => i.fullName === player)
                
            //     allPlayersArr.push(currPlayer)
            // })
            // if(this.state.once){
                // console.log(allPlayersArr)
                // this.props.submitDraftedTeams("undrafted", allPlayersArr)
            // }
            
            this.setState({
                owners: this.props.owners,
                // once: false
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
            let old = this.state.rightTradeTeam[idx]
            this.deepCopy(newPlayer, old)
            newPlayer.excludedPoints.goals += this.state.rightTradeTeam[idx].goals
            newPlayer.excludedPoints.assists += this.state.rightTradeTeam[idx].assists
            newPlayer.excludedPoints.points += this.state.rightTradeTeam[idx].points

            newPlayer.archivePoints = { goals: 0, assists: 0, points: 0}
            newLeft.push(newPlayer)
        })
        lefthighlights.forEach(idx => {
            let newPlayer = {}
            let old = this.state.leftTradeTeam[idx]
            this.deepCopy(newPlayer, old)
            newPlayer.excludedPoints.goals += this.state.leftTradeTeam[idx].goals
            newPlayer.excludedPoints.assists += this.state.leftTradeTeam[idx].assists
            newPlayer.excludedPoints.points += this.state.leftTradeTeam[idx].points
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
            // console.log(newLeft[lefthighlights[j]])
            newLeft[lefthighlights[j]].active = false
            newLeft[lefthighlights[j]].archivePoints = {
                goals: newLeft[lefthighlights[j]].goals | 0, 
                assists: newLeft[lefthighlights[j]].assists | 0, 
                points: newLeft[lefthighlights[j]].points | 0,
            }
        }

        let leftOwner = this.state.currentLeftOwner
        let rightOwner = this.state.currentRightOwner
        this.setState(prevState => ({ 
            highlighted: [new Set(),new Set()],
            owners: new Map([...prevState.owners, [this.state.currentLeftOwner, newLeft], [this.state.currentRightOwner, newRight]]) 
          }));

          console.log(leftOwner, newLeft, rightOwner, newRight)
        this.props.updateOwners([leftOwner, newLeft], [rightOwner, newRight])
    }

    deepCopy = (newPlayer, oldPlayer) => {
        // console.log("old", oldPlayer)
        // newPlayer = JSON.parse(JSON.stringify(oldPlayer))
        newPlayer.fullName = oldPlayer.fullName
        newPlayer.id = oldPlayer.id
        newPlayer.active = oldPlayer.active
        newPlayer.points = oldPlayer.points
        newPlayer.goals = oldPlayer.goals
        newPlayer.assists = oldPlayer.assists
        // newPlayer.archivePoints.goals = oldPlayer.archivePoints.goals
        // newPlayer.archivePoints = {...oldPlayer.archivePoints}
        // newPlayer.excludedPoints = JSON.parse(JSON.stringify(oldPlayer.excludedPoints))
        // console.log(JSON.parse(JSON.stringify(oldPlayer.excludedPoints)))
        // newPlayer.excludedPoints = {}
        // console.log(newPlayer.excludedPoints)
        // newPlayer.excludedPoints.goals = 10
        // console.log(newPlayer.excludedPoints)
        //  = {goals: 5, assists: 0, points: 0}
        let excludedPoints = {}
        excludedPoints.goals = oldPlayer.excludedPoints.goals
        excludedPoints.assists = oldPlayer.excludedPoints.assists
        excludedPoints.points = oldPlayer.excludedPoints.points
        newPlayer.excludedPoints = excludedPoints
        // newPlayer.excludedPoints.goals = excludedPoints.goals
        // console.log("old/new .excludedPoints.goals", excludedPoints.goals, newPlayer.excludedPoints.goals)
        // newPlayer.excludedPoints.assists = excludedPoints.assists
        // console.log("old/new .excludedPoints.assists", excludedPoints.assists, newPlayer.excludedPoints.assists)
        // newPlayer.excludedPoints.points = excludedPoints.points

        console.log("old/new", oldPlayer, newPlayer, newPlayer.excludedPoints)
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
        // console.log(this.state.stats)
        let owners = Array.from(this.state.owners.keys()) 
        let totalsIndex = owners.findIndex(i => i === "totals")
        if(totalsIndex >= 0){
            owners.splice(totalsIndex, 1)
        }
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
        owners: state.owners,
        forwards: state.forwards,
        defense: state.defense,
    };
};

const mapDispatchToProps = {
    loadOwners,
    updateOwners,
    loadOwnerScores,
    submitDraftedTeams
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(Trade);
