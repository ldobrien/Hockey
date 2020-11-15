import initialState from './initialState'

export const login = (state, action) => {
    return {email: action.email, displayName: action.displayName, loginError: ""}
}

export const loginError = (state, action) => {
    return {...state, loginError: action.error.message}
}

export const signOut = (state, action) => {
    return {}
}

export const signOutError = (state, action) => {
    return {...state, authError: action.error}
}

export const signUpSuccess = (state, action) => {
    return {...state, authError: null}
}

export const signUpError = (state, action) => {
    return {...state, authError: action.err}
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
        case 'SIGNUP_SUCCESS':
            return signUpSuccess(state, action);
        case 'SIGNUP_ERROR':
            return signUpError(state, action);
        default:
            return state;
    }
}

export default authReducer;