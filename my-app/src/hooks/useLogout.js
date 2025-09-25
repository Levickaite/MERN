import { useAuthContext } from "./useAuthContext";

export const useLogout =()=>{
    const {dispatch} = useAuthContext()
    const {dispatch: pratimoDispatch} = useAuthContext()

    const logout =() =>{
        //šaliname user iš localStorage
        localStorage.removeItem('user')

        //naikiname JWT
        dispatch({type: 'LOGOUT'})
        pratimoDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout}
}