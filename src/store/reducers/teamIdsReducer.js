import initialState from './initialState'

export const loadTeamIdsData = (state, action) => {
    var newState = []
    action.teams.forEach(team => {
        newState.push(team.id)
    })
    return newState
}

const teamIdsReducer = (state = initialState.teamIds, action) => {
    switch(action.type){
        case 'LOAD_TEAM_IDS':
          return loadTeamIdsData(state, action);
        default:
            return state;
    }
}

export default teamIdsReducer;