import { combineReducers } from "redux";
import teamRosterReducer from "./teamRosterReducer"

const rootReducer = combineReducers({
    teamRoster: teamRosterReducer,
})

export default rootReducer;