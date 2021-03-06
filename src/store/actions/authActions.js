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
                email: credentials.email,
                displayName: credentials.displayName,
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

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response)=> {
            return firestore.collection('users').doc(response.user.uid).set({
                displayName: newUser.displayName,
            })
        }).then(() => {
            dispatch({
                type: 'SIGNUP_SUCCESS'
            })
        }).catch((err) => {
            console.log("error", err.message)
            dispatch({
                type: 'SIGNUP_ERROR',
                err: err.message
            })
        })
    }
}