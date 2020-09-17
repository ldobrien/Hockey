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

export const submitTeam = (team) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('chosenTeam').add({
            id: "auth",
            team: team
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
            console.log("ERROR: ", err)
        })
        
    }
}
