// GET_TOP_PLAYERS
import initialState from './initialState'

export const getDraftOrder = (state, action) => {
    // console.log(action)
    // const newState = []
    // for(var i = 0; i < 15; i++){
    //     if(i === 0){
    //         newState.push(...action.order)
    //     } else {
    //         var rev = action.order.reverse()
    //         newState.push(...rev)
    //     }
    // }
    // console.log(newState)
    // return newState
    return action.order
}

const draftOrderReducer = (state = initialState.draftOrder, action) => {
    switch(action.type){
        case "GET_DRAFT_ORDER":
            return getDraftOrder(state, action);
        default:
            return state;
    }
}

export default draftOrderReducer;