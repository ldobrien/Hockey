import { combineReducers } from "redux";
import teamRosterReducer from "./teamRosterReducer"
import selectedTeamsReducer from "./selectedTeamsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    teamRoster: teamRosterReducer,
    selectedTeams: selectedTeamsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
})

export default rootReducer;