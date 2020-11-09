import initialState from './initialState'

export const addPlayersToRoster = (state, action) => {
    var addroster = []
    console.log("players")
    action.teamRoster.forEach(actionPlayer => {
        if(state.filter(player => player.id === actionPlayer.person.id).length === 0 ){
            var currPlayer = {
                jerseyNumber: actionPlayer.jerseyNumber,
                id: actionPlayer.person.id,
                fullName: actionPlayer.person.fullName,
                position: actionPlayer.position.type,
                position_name: actionPlayer.position.name,
                team: action.team.name,
                teamId: action.team.id,
                conference: action.team.division.name
            }
            addroster.push(currPlayer)
        }
    });
    return [...state, ...addroster]
}

export const sortRoster = (state, action) => {
    console.log("sorting...", action)
    return state
}

const teamRosterReducer = (state = initialState.teamRoster, action) => {
    switch(action.type){
        case 'ADD_PLAYERS_TO_ROSTER':
          return addPlayersToRoster(state, action);
        case 'SORT_ROSTER':
            return sortRoster(state, action);
        default:
            return state;
    }
}

export default teamRosterReducer;