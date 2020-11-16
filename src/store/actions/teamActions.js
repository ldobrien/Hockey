export const loadRosters = () => {
    return (dispatch) => {
        return fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
            .then(response => response.json())
            .then(json => {
                json.teams.forEach(team => {
                    return fetch(`https://statsapi.web.nhl.com/api/v1/teams/`+team.id+`?expand=team.roster`)
                    .then(response => response.json())
                    .then(json => 
                        {
                        dispatch(
                            { 
                                type: "ADD_PLAYERS_TO_ROSTER",
                                teamRoster: json.teams[0].roster.roster,
                                team: team
                            })
                        }
                    )
                })
            })
    }
}

export const submitTeam = (team, auth, displayName) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('chosenTeam').doc(auth.uid).set({
            id: auth.uid,
            email: auth.email,
            team: team,
            displayName: displayName
        })
        .then(() => {
            dispatch(
                {
                  type: "CREATE_TEAM",
                  team: team
                }
            )
        })
        .catch((err) => {
            dispatch({
                type: "CREATE_TEAM_ERROR",
                err: err
            })
        })
        
    }
}
