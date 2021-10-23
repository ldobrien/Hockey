export const loadOwnerScores = (ownerTeamMap) => {
    return (dispatch) => {
        var stats = []
        var owners = Array.from(ownerTeamMap.keys())
        for(var owner of owners){
            let currOwner = owner
            var team = ownerTeamMap.get(owner)
            for(var player of team){
                let currPlayer = player
                fetch(`https://statsapi.web.nhl.com/api/v1/people/`+player.id+'/stats?stats=statsSingleSeason&season=20212022')
                .then(response => response.json())
                .then(json => {
                    
                    if(json.stats[0].splits[0]){
                        // console.log("ACTION", json.stats[0].splits[0].stat, player, currPlayer)
                        stats.push(json.stats[0].splits[0].stat)
                        dispatch(
                            { 
                                type: "ADD_SCORES",
                                payload: json.stats[0].splits[0].stat,
                                player: currPlayer,
                                owner: currOwner,
                        })
                    }
                    else {
                        console.log(json)
                    }
                    
                })
            }
        }
    }
}