export const loadScoreboard = (teams) => {
    return (dispatch) => {
        var teamKeys = Object.keys(teams)
        for(var key of teamKeys){
            var team = teams[key].team
            for(var index = 0 ; index < Object.keys(team).length; index++){
                let playerId = Object.keys(team)[index]
                let currkey = key
                let player = team[playerId]
                fetch(`https://statsapi.web.nhl.com/api/v1/people/`+playerId+'/stats?stats=statsSingleSeason&season=20212022')
                    .then(response => response.json())
                    .then(json => 
                        {
                        dispatch(
                            { 
                                type: "GET_SCOREBOARD",
                                payload: json.stats[0],
                                key: currkey,
                                player: player
                            })
                        }
                    )
            }
        }
    }
}