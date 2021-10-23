import initialState from './initialState'

export const getOwners = (state, action) => {
    let owners = new Map()
    let players = Array.from(action.owners.keys())
    players.forEach(elem => {
        owners.set(elem, action.owners.get(elem).team)
    })
    return owners
}

export const updateOwners = (state, action) => {
    let owners = state
    owners.set(action.left[0], action.left[1])
    owners.set(action.right[0], action.right[1])
    return owners
}

export const addScores = (state, action) => {
    let owners = new Map()
    let keys = Array.from(state.keys())
    keys.forEach(owner => {
        owners.set(owner, state.get(owner))
    })
    let updatedOwner = action.owner
    let team = state.get(updatedOwner)
    let playerToUpdate = team.find(i => i.id === action.player.id)

    playerToUpdate.goals = action.payload.goals ? action.payload.goals - playerToUpdate.excludedPoints.goals : 0
    playerToUpdate.assists = action.payload.assists ? action.payload.assists - playerToUpdate.excludedPoints.assists : 0
    playerToUpdate.points = 2 * playerToUpdate.goals + playerToUpdate.assists
    let currOwnerTotal = {...state.get("totals")}
   
    if(currOwnerTotal[updatedOwner] === undefined){
        currOwnerTotal[updatedOwner] = playerToUpdate.points - playerToUpdate.excludedPoints.points
    } else if (playerToUpdate.active) {
        currOwnerTotal[updatedOwner] = currOwnerTotal[updatedOwner] + playerToUpdate.points
    } else {
        currOwnerTotal[updatedOwner] += playerToUpdate.archivePoints.points
    }
    owners.set("totals", currOwnerTotal)
    owners.set(updatedOwner, team)

    return owners
}

const ownersReducer = (state = initialState.owners, action) => {
    switch(action.type){
        case "GET_OWNERS":
            return getOwners(state, action);
        case "UPDATE_OWNERS":
            return updateOwners(state, action);
        case "ADD_SCORES":
            return addScores(state, action);
        default:
            return state;
    }
}

export default ownersReducer;