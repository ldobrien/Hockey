import initialState from './initialState'

export const loadTeamRosterData = (state, action) => {
    // console.log("RETURNING", action.teamRoster.teams[0].roster)
    return action.teamRoster.teams[0].roster.roster
}

const teamRosterReducer = (state = initialState.teamRoster, action) => {
    switch(action.type){
        case 'LOAD_TEAM_ROSTER':
          return loadTeamRosterData(state, action);
        default:
            return state;
    }
}

export default teamRosterReducer;