export const loadForwards = () => {
    return(dispatch, getState, {getFiresbase, getFirestore}) => {
        // const firestore = getFirestore();
        // const playersArr = []
        // firestore.collection('forwards').get()
        // .then((players) => {
        //     players.forEach((doc) => {
        //         playersArr.push(doc.data())
        //     })
        // })
        // .then(() => {
        //     dispatch(
        //         { 
        //             type: "GET_FORWARDS",
        //             player: playersArr
        //         })
        //     })
    }
}

export const loadDefense = () => {
    return(dispatch, getState, {getFiresbase, getFirestore}) => {
        // const firestore = getFirestore();
        // const playersArr = []

        // firestore.collection('defense').get()
        // .then((players) => {
        //     players.forEach((doc) => {
        //         playersArr.push(doc.data())
        //     })
        // })
        // .then(() => {
        //     dispatch(
        //         { 
        //             type: "GET_DEFENSE",
        //             player: playersArr
        //         })
        //     })
    }
}

export const getPlayerStats = (playerId, position) => {
    if(position === 'Forward'){
        return (dispatch) => { 
            // dispatch(
            // { 
            //     type: "GET_FORWARDS_STATS",
            // })
            fetch(`https://statsapi.web.nhl.com/api/v1/people/`+playerId+'/stats?stats=statsSingleSeason&season=20212022')
            .then(response => response.json())
            .then(json => 
                {
                    // console.log(json)
                dispatch(
                    { 
                        type: "GET_FORWARDS_STATS",
                        payload: json.stats[0].splits[0],
                        position: position,
                        playerId: playerId
                    })
                }
            )
        }
    } else {
        return (dispatch) => { 
                // dispatch(
                //     { 
                //         type: "GET_DEFENSE_STATS",
                //     })
            fetch(`https://statsapi.web.nhl.com/api/v1/people/`+playerId+'/stats?stats=statsSingleSeason&season=20212022')
            .then(response => response.json())
            .then(json => 
                {
                    // console.log(json)
                dispatch(
                    { 
                        type: "GET_DEFENSE_STATS",
                        payload: json.stats[0].splits[0],
                        position: position,
                        playerId: playerId
                    })
                }
            )
        }
    }

}