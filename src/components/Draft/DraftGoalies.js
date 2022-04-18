import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftGoaliesOrder, saveOrder} from '../../store/actions/draftOrderActions'
// import {loadGoalies} from "../../store/actions/teamActions"
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import './DraftBoard.css'
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

class DraftGoalies extends Component {
    state ={
        goalies: [],
        draftOrder: this.props.goalieDraftOrder,
        teams: []
    }

    componentDidMount(){
        this.props.loadDraftGoaliesOrder()

        let teams = new Set()
        this.props.goalies.forEach(goalie => {
            teams.add(goalie.team)
        })
        this.setState({
            teams: Array.from(teams)
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.goalieDraftOrder !== prevProps.goalieDraftOrder){
            this.setState({
                draftOrder: this.props.goalieDraftOrder
            })
            //// this.props.saveOrder(this.props.goalieDraftOrder)
        }
    }

    handleChange = (event, index) => {
        // const value = this.state.value
        // value[index] = event.target.value
        // this.setState({
        //     ...value
        // });
    }

    handleSubmit = (e, index) => {
        // e.preventDefault()
        // let drafted = this.state.draftees
        // drafted[index].drafted = this.state.value[index]
        // this.setState({
        //     draftees: drafted,
        // }, this.props.submitDraftBoard(this.state.draftees))
      }

    handleRequestOptions = (value, index) => {
        const statevalue = this.state.value
        statevalue[index] = value.substr(1)
        this.setState({
            value: statevalue
        });
    }

    itemRenderer(item, index) {
        var className = "item"
        let drafteEntry = <div></div>
        if(item.drafted === undefined){
            drafteEntry = (<form>
                    <label>
                        <TextInput regex={/^[a-zA-Z\s]+$/} matchAny="true" options={this.state.teams} onSelect={(value) => this.handleRequestOptions(value, index)} />
                    </label>
                    <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e, index)}/>
                </form>)
        } else {
            drafteEntry = <p>{item.drafted}</p>
        }
        return (
            <div key={index} className={className} onClick={(e) => this.onClick(e, index)}>
                <img className="photo" src={item.logo}/>
                <span className="right small">{index + 1}</span>
                <p className="title">{item.title}</p>
                {drafteEntry}
            </div>
        )
    }

    draftComplete = () => {
        let owners = new Map()

        // this.state.draftees.forEach(pick => {
        //     if(owners.has(pick.title)){
        //         if(pick.drafted !== undefined){
        //             owners.set(pick.title, [...owners.get(pick.title), getPlayerId(pick.drafted)])
        //         }  
        //     } else {
        //         if(pick.drafted === undefined){
        //             owners.set(pick.title, [])
        //         } else {
        //             owners.set(pick.title, [getPlayerId(pick.drafted)])
        //         }
        //     }
        // })

        // let ownerNames = Array.from(owners.keys())
        
        // ownerNames.forEach(owner => {
        //     let team = owners.get(owner)
        //     // console.log(owner, team)
        //     this.props.submitDraftedTeams(owner, team)
        // })
    }

    render() {
        console.log(this.props.goalieDraftOrder)
        let elems = []
        let grid = []
        this.state.draftOrder.forEach((elem, index) => {
            if(index % 8 === 0 && index > 0){
                grid.push(<h6 key={grid.length}>Round {index / 8}</h6>)
                grid.push(<div className="eachround" key={grid.length}>{elems}</div>)
                elems = []
            }
            elems.push(this.itemRenderer(elem, index))
        })      
        grid.push(<h6 key={grid.length}>Round 15</h6>)
        grid.push(elems)

        return (
            <div>
            <div>
                {/* {JSON.stringify(this.props.goalieDraftOrder)} */}
            {grid}
            </div>
            <button onClick={this.draftComplete}>Goalie DRAFT COMPLETE</button>
            </div>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        goalieDraftOrder: state.goalieDraftOrder,
        goalies: state.goalies
    };
};

const mapDispatchToProps = {
    loadDraftGoaliesOrder,
    saveOrder,
    // loadGoalies
    // submitDraftBoard,
    // submitDraftedTeams
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(DraftGoalies);