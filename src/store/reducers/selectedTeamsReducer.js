import initialState from './initialState'

export const createTeam = (state, action) => {
    return [...state, action.team]
}

export const createTeamError = (state, action) => {
    // TODO: need to handle the error somehow
    return [...state]
}

const selectedTeamsReducer = (state = initialState.selectedTeams, action) => {
    switch(action.type){
        case 'CREATE_TEAM':
            return createTeam(state, action);
        case 'CREATE_TEAM_ERROR':
            return createTeamError(state, action);
        default:
            return state;
    }
}

export default selectedTeamsReducer;