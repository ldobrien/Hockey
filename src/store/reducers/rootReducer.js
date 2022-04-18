import { combineReducers } from "redux";
import teamRosterReducer from "./teamRosterReducer"
import selectedTeamsReducer from "./selectedTeamsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import scoreboardReducer from "./scoreboardReducer";
import draftForwardsReducer from "./draftForwardsReducer";
import draftDefenseReducer from "./draftDefenseReducer";
import draftOrderReducer from "./draftOrderReducer";
import ownersReducer from "./ownersReducer"
import draftGoalieReducer from "./draftGoalieReducer"
import goalieReducer from "./goalieReducer"

const rootReducer = combineReducers({
    teamRoster: teamRosterReducer,
    selectedTeams: selectedTeamsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    scoreboard: scoreboardReducer,
    // topPlayers: draftReducer,
    forwards: draftForwardsReducer,
    defense: draftDefenseReducer,
    draftOrder: draftOrderReducer,
    owners: ownersReducer,
    goalieDraftOrder: draftGoalieReducer,
    goalies: goalieReducer,
})

export default rootReducer;