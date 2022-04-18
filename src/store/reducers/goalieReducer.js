// GET_TOP_PLAYERS
import initialState from './initialState'

export const getGoalies = (state, action) => {
    console.log(action)
    var addroster = []
    action.teamRoster.forEach(actionPlayer => {
        if(actionPlayer.position.type !== "Goalie"){
            return state
        }
        if(state.filter(player => player.id === actionPlayer.person.id).length === 0 ){
            // console.log(action.team)
            var currPlayer = {
                id: actionPlayer.person.id,
                fullName: actionPlayer.person.fullName,
                position: actionPlayer.position.type,
                team: action.team.name,
                teamId: action.team.id,
                active: true,
            }
            addroster.push(currPlayer)
        }
    });
    // console.log(addroster)
    return [...state, ...addroster]
    // return state
}

const goalieReducer = (state = initialState.goalies, action) => {
    switch(action.type){
        case "ADD_GOALIES_TO_ROSTER":
            return getGoalies(state, action);
        default:
            return state;
    }
}

export default goalieReducer;