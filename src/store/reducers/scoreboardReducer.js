import initialState from './initialState'

export const getScoreboard = (state, action) => {
    let prevState = state[action.key] ? state[action.key] : []
    let results = prevState.filter(entry => {
        return entry.player.id === action.player.id
    })
    if(results.length > 0){
        return state
    }
    let newState = {...state}
    let newPlayer = action.payload
    newPlayer.player = action.player
    newState[action.key] = [...prevState, newPlayer]
    return newState
}

const scoreboardReducer = (state = initialState.scoreboard, action) => {
    switch(action.type){
        case 'GET_SCOREBOARD':
            return getScoreboard(state, action);
        default:
            return state;
    }
}

export default scoreboardReducer;