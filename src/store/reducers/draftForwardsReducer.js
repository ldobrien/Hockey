// GET_TOP_PLAYERS
import initialState from './initialState'

export const getForwards = (state, action) => {
    return [...state, action.player]
}

export const getForwardStats = (state, action) => {

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

const draftForwardsReducer = (state = initialState.forwards, action) => {
    switch(action.type){
        case 'GET_FORWARDS':
            return getForwards(state, action);
        case 'GET_FORWARDS_STATS':
            return getForwardStats(state, action);
        default:
            return state;
    }
}

export default draftForwardsReducer;