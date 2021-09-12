// GET_TOP_PLAYERS
import initialState from './initialState'

export const getDefense = (state, action) => {
    return [...state, action.player]
}

export const getDefenseStats = (state, action) => {
    
    // let currPlayer = state.find(player => player.id === action.playerId)
    // if(action.payload === undefined){
    //     currPlayer.stats = {
    //         stat: []
    //     }
    //     return state
    // }
    // currPlayer.stats = action.payload
    return state
}

const draftDefenseReducer = (state = initialState.defense, action) => {
    switch(action.type){
        case 'GET_DEFENSE':
            return getDefense(state, action);
        case 'GET_DEFENSE_STATS':
            return getDefenseStats(state, action);
        default:
            return state;
    }
}

export default draftDefenseReducer;