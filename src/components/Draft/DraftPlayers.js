// draftOrder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftOrder, submitDraftBoard, submitDraftedTeams} from '../../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import './DraftBoard.css'
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import {getPlayerId} from "../Season/PlayerIds";

class DraftBoard extends Component {
    state ={
        draftees: this.props.draftOrder,
        selected: [],
        value: new Array(120),
        forwards: [],
        defense: [],
        names: []
    }

    componentDidMount(){
        this.props.loadDraftOrder()
        let names = []
        this.props.forwards.forEach(player => {
            names.push(player.fullName)
        })
        this.props.defense.forEach(player => {
            names.push(player.fullName)
        })
        this.setState({
            forwards: this.props.forwards,
            defense: this.props.defense,
            names // this doesn't filter drafted players on refresh
        })
    }

    componentDidUpdate(){
        if(this.state.draftees.length !== this.props.draftOrder.length){
            this.setState({
                draftees: this.props.draftOrder,
            })
        }
        else if(this.compareArrays(this.state.draftees, this.props.draftOrder)){
            this.setState({
                draftees: this.props.draftOrder,
            })
        }
    }

    compareArrays(arr1, arr2){
        for(var i = 0; i < arr1.length; i++){
            if(arr1[i].drafted !== arr2[i].drafted){
                return true
            }
        }
        return false
    }

    onClick = (e, i) => {
        var deselect = this.state.selected.indexOf(i)
        if(deselect > -1){
            var selected = this.state.selected
            selected.splice(deselect, 1)
            this.setState({ selected })
            return
        }
        if(this.state.selected.length === 2){
            return
        } 
        this.setState({
            selected: [...this.state.selected, i]
        })
    }

    onSubmit = () => {
        if(this.state.selected.length !== 2){
            console.log("error")
            return
        }
        var newDraft = this.state.draftees
        var temp = newDraft[this.state.selected[0]]
        newDraft[this.state.selected[0]] = newDraft[this.state.selected[1]]
        newDraft[this.state.selected[1]] = temp
        this.setState({
            draftees: newDraft,
            selected: []
        }, this.props.submitDraftBoard(this.state.draftees))
    }

    handleChange = (event, index) => {
        const value = this.state.value
        value[index] = event.target.value
        this.setState({
            ...value
        });
    }

    handleSubmit = (e, index) => {
        e.preventDefault()
        let drafted = this.state.draftees
        let names = this.state.names
        names.splice(names.indexOf(this.state.value[index].trim()), 1)
        drafted[index].drafted = this.state.value[index]
        this.setState({
            draftees: drafted,
            names
        }, this.props.submitDraftBoard(this.state.draftees))
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
        if(this.state.selected.indexOf(index) >= 0){
            className = "selectedItem"
        }
        let drafteEntry = <div></div>
        if(item.drafted === undefined){
            drafteEntry = (<form>
                    <label>
                        <TextInput regex={/^[a-zA-Z\s]+$/} matchAny="true" options={this.state.names} onSelect={(value) => this.handleRequestOptions(value, index)} />
                    </label>
                    {this.props.auth? <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e, index)}/> : <div/>}
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
        // Adding the initial teams after the draft
        let owners = new Map()

        this.state.draftees.forEach(pick => {
            if(owners.has(pick.title)){
                if(pick.drafted !== undefined){
                    owners.set(pick.title, [...owners.get(pick.title), getPlayerId(pick.drafted)])
                }  
            } else {
                if(pick.drafted === undefined){
                    owners.set(pick.title, [])
                } else {
                    owners.set(pick.title, [getPlayerId(pick.drafted)])
                }
            }
        })

        let ownerNames = Array.from(owners.keys())
        
        ownerNames.forEach(owner => {
            let team = owners.get(owner)
            // console.log(owner, team)
            this.props.submitDraftedTeams(owner, team)
        })
    }

    render() {
        let elems = []
        let grid = []
        this.state.draftees.forEach((elem, index) => {
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
                    <div className="buttonDiv">
                    {this.props.auth? <button className="button btn pink-lighten-1 z-depth-0" onClick={() => this.onSubmit()}>SWAP</button> : <div/>}
                        <div className="button playerCount">//TODO</div>
                    </div>
                    
                    {grid}
                </div>
                {this.props.auth? <button onClick={this.draftComplete}>DRAFT COMPLETE</button> : <div/>}
            </div>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        draftOrder: state.draftOrder,
        forwards: state.forwards,
        defense: state.defense,
        auth: state.firebase.auth.uid
    };
};

const mapDispatchToProps = {
    loadDraftOrder,
    submitDraftBoard,
    submitDraftedTeams
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps,)
, firestoreConnect([{collection: 'chosenTeam'}]))(DraftBoard);