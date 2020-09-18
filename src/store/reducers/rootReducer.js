import { combineReducers } from "redux";
import teamRosterReducer from "./teamRosterReducer"
import selectedTeamsReducer from "./selectedTeamsReducer";
// import { firestoreReducer, firebaseReducer } from "react-redux-firebase";
import { firestoreReducer, firebaseReducer } from "redux-firestore";

const rootReducer = combineReducers({
    teamRoster: teamRosterReducer,
    selectedTeams: selectedTeamsReducer,
    // firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;