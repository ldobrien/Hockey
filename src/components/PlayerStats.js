let PLAYER_GOAL = 2
let PLAYER_ASSIST = 1
let GOALIE_WIN = 1
let GOALIE_SHUTOUT = 1
let GOALIE_GOAL = 10
let GOALIE_ASSIST = 1

export const getPlayerPoints = (player) => {
    if(player.position === "Goalie"){
        return player.goals * GOALIE_GOAL
        + player.assists * GOALIE_ASSIST
        + player.wins * GOALIE_WIN
        + player.shutouts * GOALIE_SHUTOUT
    }
    return player.goals * PLAYER_GOAL + player.assists * PLAYER_ASSIST
}