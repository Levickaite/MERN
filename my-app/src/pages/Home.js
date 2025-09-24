import { useEffect, useState } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutContext} from "../hooks/useWorkoutContext"


const Home = () => {
    const {pratimai, dispatch} = useWorkoutContext()

    useEffect(()=>{
        const fetchPratimus = async () =>{
            const response = await fetch('/api/pratimai')
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchPratimus()
    }, [dispatch])
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