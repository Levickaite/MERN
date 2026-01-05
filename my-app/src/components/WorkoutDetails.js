import { useWorkoutContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"
import { API_BASE } from '../config'

const WorkoutDetails = ({pratimas}) => {
    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    const handleClick = async () =>{
        const response = await fetch(`${API_BASE}/api/pratimai/` + pratimas._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return (
        <div className="workout-details">
            <h4>{pratimas.title}</h4>
            <p><strong>Svoris (kg):</strong> {pratimas.load}</p>
            <p><strong>Pratimo pakartojimai:</strong> {pratimas.reps}</p>
            <p>{formatDistanceToNow(new Date(pratimas.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails