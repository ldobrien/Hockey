import initialState from './initialState'

export const login = (state, action) => {
    console.log("ACTION", action)
    return {email: action.email, error: ""}
}

export const loginError = (state, action) => {
    return {...state, error: action.error}
}

export const signOut = (state, action) => {
    return {}
}

export const signOutError = (state, action) => {
    return {...state, error: action.error}
}

const authReducer = (state = initialState.auth, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return login(state, action);
        case 'LOGIN_ERROR':
            return loginError(state, action);
        case 'SIGNOUT_SUCCESS':
            return signOut(state, action);
        case 'SIGNOUT_ERROR':
            return signOutError(state, action);
        default:
            return state;
    }
}

export default authReducer;