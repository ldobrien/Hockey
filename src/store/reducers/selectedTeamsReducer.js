import initialState from './initialState'

export const createTeam = (state, action) => {
    let newstate = [...state, action.team]
    newstate.status = "Team Successfully Created"
    return newstate
}

export const createTeamError = (state, action) => {
    let newstate = {...state}
    newstate.status = action.err
    return newstate
}

export const trade = (state, action) => {
    return action.team
}

export const tradeError = (state, action) => {
    // Need to handle this error
    return state
}

const selectedTeamsReducer = (state = initialState.selectedTeams, action) => {
    switch(action.type){
        case 'CREATE_TEAM':
            return createTeam(state, action);
        case 'CREATE_TEAM_ERROR':
            return createTeamError(state, action);
        case 'TRADE':
            return trade(state, action);
        case 'TRADE_ERROR':
            return tradeError(state, action);
        default:
            return state;
    }
}

export default selectedTeamsReducer;