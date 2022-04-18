// GET_TOP_PLAYERS
import initialState from './initialState'

export const getGoalieDraftOrder = (state, action) => {
    // console.log(action)
    const newState = []
    for(var i = 0; i < 3; i++){
        if(i === 0){
            newState.push(...action.order)
        } else {
            var rev = action.order.reverse()
            newState.push(...rev)
        }
    }
    // console.log(newState)
    return newState
    // return newState
    // return action.order
}

export const getGoalieDraftOrderFromDb = (state, action) => {
    return action.order
}

const draftGoalieReducer = (state = initialState.goalieDraftOrder, action) => {
    switch(action.type){
        case "GET_GOALIE_DRAFT_ORDER":
            return getGoalieDraftOrder(state, action);
        case "GET_GOALIE_DRAFT_ORDER_FROM_DB":
            return getGoalieDraftOrderFromDb(state, action);
        default:
            return state;
    }
}

export default draftGoalieReducer;