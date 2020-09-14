import initialState from './initialState'

export const loadTeamsData = (state, action) => {
    return action.teams
}

const teamReducer = (state = initialState.teams, action) => {
    switch(action.type){
        case 'LOAD_TEAMS':
          return loadTeamsData(state, action);
        default:
            return state;
    }
}

export default teamReducer;