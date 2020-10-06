export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(() => {
            dispatch({
                type: 'LOGIN_SUCCESS',
                email: credentials.email
            })
        })
        .catch((err) => {
            dispatch({type: 'LOGIN_ERROR', error: err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
        .catch((err) => {
            dispatch({type: 'SIGNOUT_ERROR', error: err})
        })
    }
}