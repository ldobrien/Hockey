import { combineReducers } from "redux";
import teamRosterReducer from "./teamRosterReducer"
import selectedTeamsReducer from "./selectedTeamsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import scoreboardReducer from "./scoreboardReducer";

const rootReducer = combineReducers({
    teamRoster: teamRosterReducer,
    selectedTeams: selectedTeamsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    scoreboard: scoreboardReducer,
})

export default rootReducer;