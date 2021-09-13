// draftOrder
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadDraftOrder, submitDraftBoard} from '../store/actions/draftOrderActions'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import './DraftBoard.css'

class DraftBoard extends Component {
    state ={
        draftees: this.props.draftOrder,
        selected: [],
        value: new Array(120)
    }

    componentDidMount(){
        this.props.loadDraftOrder()
    }

    componentDidUpdate(){
        if(this.state.draftees.length !== this.props.draftOrder.length){
            this.setState({
                draftees: this.props.draftOrder,
            })
        }
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
        // console.log("submit")
        // this.props.submitDraftBoard(this.state.draftees)
        if(this.state.selected.length !== 2){
            console.log("error")
            return
        }
        var newDraft = this.state.draftees
        // console.log(this.state.selected)
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
        drafted[index].drafted = this.state.value[index]
        this.setState({
            draftees: drafted,
        }, this.props.submitDraftBoard(this.state.draftees))
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
                    <textarea value={this.state.value[index]} onChange={(e) => this.handleChange(e, index)} />
                    </label>
                    <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e, index)}/>
                </form>)
        } else {
            drafteEntry = <h7>drafted: {item.drafted}</h7>
        }
        return (
            <div key={index} className={className} onClick={(e) => this.onClick(e, index)}>
                <img className="photo" src={item.logo}/>
                <p className="title">{item.title}</p>
                {drafteEntry}
            </div>
        )
    }

    render() {
        let elems = []
        let grid = []
        this.state.draftees.forEach((elem, index) => {
            if(index % 8 === 0 && index > 0){
                grid.push(<h6>Round {index / 8}</h6>)
                grid.push(<div className="eachround">{elems}</div>)
                elems = []
            }
            elems.push(this.itemRenderer(elem, index))
        })      
        grid.push(<h6>Round 15</h6>)
        grid.push(elems)
        return (
            <div>
                <div className="buttonDiv">
                <button className="button" onClick={() => this.onSubmit()}>SWAP</button>
            </div>
            {grid}
            
            
            </div>
        )
    }
    
}
const mapStateToProps = state => {
    return {
        draftOrder: state.draftOrder
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
, firestoreConnect([{collection: 'chosenTeam'}]))(DraftBoard);


// // draftOrder
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {submitTeam, saveToDB} from '../store/actions/teamActions'
// import {loadForwards, loadDefense, getPlayerStats} from '../store/actions/draftActions'
// import {compose} from 'redux'
// import { firestoreConnect } from 'react-redux-firebase';
// import './DraftBoard.css'
// import RLDD from 'react-list-drag-and-drop/lib/RLDD';

// class DraftBoard extends Component {
//     state ={
//         draftees: [
//                 {
//                   "id": 0,
//                   "title": "Traci",
//                   "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//                   "logo": "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
//                 },
//                 {
//                     "id": 1,
//                     "title": "Lisa",
//                     "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//                     "logo":"https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d"
//                   },
//                 ]
//     }

//     handleRLDDChange = (newItems) => {
//         this.setState({ draftees: newItems });
//       }

//     itemRenderer(item, index) {
//         return (
//             <div className="item">
//             <img className="photo" src={item.logo}/>
//             <p className="title">{item.title}</p>
//             <p className="body">{item.body}</p>
//             <div className="small">
//                 item.id: {item.id} - index: {index}
//             </div>
//             </div>
//         )
//     }

//     render() {        
//         return (
//             <RLDD
//                 items={this.state.draftees}
//                 itemRenderer={this.itemRenderer}
//                 onChange={this.handleRLDDChange}
//                 />
//             // <DraggableList itemkey="0" list={this.state.draftees}/>
//             // <div className="inside-container">
//             // </div>

//         )
//     }
    
// }
// const mapStateToProps = state => {
//     return {
//         topPlayers: state.topPlayers,
//         auth: state.firebase.auth,
//         displayName: state.firebase.profile.displayName,
//         selectedTeams: state.selectedTeams,
//         forwards: state.forwards,
//         defense: state.defense
//     };
// };

// const mapDispatchToProps = {
//     submitTeam,
//     saveToDB,
//     loadForwards, 
//     loadDefense,
//     getPlayerStats
// };

// export default compose(
//     connect(
//     mapStateToProps,
//     mapDispatchToProps,)
// , firestoreConnect([{collection: 'chosenTeam'}]))(DraftBoard);
