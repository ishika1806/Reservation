import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    date: undefined,
    options: {
        adults: undefined,
        children: undefined,
        room: undefined
    }
}
export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_SEARCH':
            return action.payload
        case 'RESET_SEARCH':
            return INITIAL_STATE
        default:
            return state
    }
}
export const searchContext = createContext(INITIAL_STATE);
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE)
    return <searchContext.Provider value={
        {
            city: state.city,
            date: state.date,
            options: state.options,
            dispatch:dispatch
        }}>

        {children}
    </searchContext.Provider>
}