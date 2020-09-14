export const loadTeams = () => {
    return (dispatch) => {
        return fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
            .then(response => response.json())
            .then(json => dispatch(
                { 
                    type: "LOAD_TEAMS",
                    teams: json.teams
                })
            )
    }
}

export const loadTeamIds = () => {
    return (dispatch) => {
        return fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
            .then(response => response.json())
            .then(json => dispatch(
                { 
                    type: "LOAD_TEAM_IDS",
                    teams: json.teams
                })
            )
    }
}

export const loadPlayerStats = (player) => {
    return (dispatch) => {
        return fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
            .then(response => response.json())
            .then(json => dispatch(
                { 
                    type: "LOAD_PLAYER",
                    teams: json.teams
                })
            )
    }
}
export const loadTeamsRoster = (id) => {
    return (dispatch) => {
        return fetch(`https://statsapi.web.nhl.com/api/v1/teams/`+id+`?expand=team.roster`)
            .then(response => response.json())
            .then(json => 
                dispatch(
                { 
                    type: "LOAD_TEAM_ROSTER",
                    teamRoster: json
                })
            )
    }
}
