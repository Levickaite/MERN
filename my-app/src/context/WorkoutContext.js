import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            console.log(action.payload);
            return {pratimai: action.payload}
            
        case 'CREATE_WORKOUT':
            return {pratimai: [action.payload, ...state.pratimai]}
        case 'DELETE_WORKOUT':
            console.log(state.pratimai.filter(pratimas => pratimas._id !== action.payload._id)
);
            return {
                pratimai: state.pratimai.filter(pratimas => pratimas._id !== action.payload._id)
                
                
            }
            default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workoutReducer, {
        pratimai: null
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}