import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react"


const INITIAL_STATE = {
    user: null || JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null
}
export const AuthContext = createContext(INITIAL_STATE);
const actionReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: state.user,
                loading: true,
                error: state.error
            }
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: state.error
            }
        case 'LOGIN_FAILED':
            return {
                user: state.user,
                loading: false,
                error: action.payload
            }
        case 'LOGOUT':
            return {
                user: state.user,
                loading: false,
                error: state.error
            }
        default: return state

    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actionReducer, INITIAL_STATE)
    useEffect(
        ()=>localStorage.setItem('user',JSON.stringify(state.user) ),[state.user]
    )
    return <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch:dispatch,
    }}>{children}</AuthContext.Provider>
}