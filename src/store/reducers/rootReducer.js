import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import teamRosterReducer from "./teamRosterReducer"
import teamIdsReducer from './teamIdsReducer'

const rootReducer = combineReducers({
    teams: teamReducer,
    teamRoster: teamRosterReducer,
    teamIds: teamIdsReducer,
})

export default rootReducer;