import { useEffect } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutContext} from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { API_BASE } from '../config'

const Home = () => {
    const {pratimai, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchPratimus = async () =>{
        const response = await fetch(`${API_BASE}/api/pratimai`,{
            headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchPratimus()
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="workouts">
                {pratimai && pratimai.map((pratimas)=>(
                    <WorkoutDetails key={pratimas.id} pratimas={pratimas} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home