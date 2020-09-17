import initialState from './initialState'

export const createTeam = (state, action) => {
    return [...state, action.team]
}

const selectedTeamsReducer = (state = initialState.selectedTeams, action) => {
    switch(action.type){
        case 'CREATE_TEAM':
            return createTeam(state, action);
        default:
            return state;
    }
}

export default selectedTeamsReducer;