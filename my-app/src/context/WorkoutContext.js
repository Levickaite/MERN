import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            console.log(action.payload);
            return {pratimai: Array.isArray(action.payload) ? action.payload : [action.payload]}
            
        case 'CREATE_WORKOUT':
            return {pratimai: [action.payload, ...(state.pratimai || [])]}
        case 'DELETE_WORKOUT':
            // ensure state.pratimai is an array before filtering
            const current = state.pratimai || []
            console.log(current.filter(pratimas => pratimas._id !== action.payload._id));
            return {
                pratimai: current.filter(pratimas => pratimas._id !== action.payload._id)
            }
            default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workoutReducer, {
        pratimai: []
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}