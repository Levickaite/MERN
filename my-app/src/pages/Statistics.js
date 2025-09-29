import { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Stats = () =>{
    
    const [data, setData] = useState([])
    const [progress, setProgress] = useState(0)
    const {pratimai} = useWorkoutContext()

    const [weeklyGoal, setWeeklyGoal] = useState(500)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!pratimai) return

        const grouped={}
        const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        
        const now = new Date()
        const dayOfWeek = now.getDay()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - dayOfWeek +1)
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek =new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() +6)
        endOfWeek.setHours(23, 59, 59, 999)

        pratimai.forEach((pratimas)=>{
            const date = new Date(pratimas.createdAt)
            const day = date.toLocaleString("en-US", {weekday: "short"})
            if (date >= startOfWeek && date <= endOfWeek){
                if (!grouped[day]) grouped[day] =0
                grouped[day] += pratimas.reps
                
            }
        })
        const chartData = weekdayOrder.map((day)=>({
            day,
            reps: grouped[day] || 0
        }))
        
        setData(chartData)
        
        const totalReps = pratimai.filter((item) => {
            const d = new Date(item.createdAt)
            return d >= startOfWeek && d  <= endOfWeek
        }). reduce((sum, item)=> sum + item.reps, 0)
        
        setProgress(Math.min(100, Math.round((totalReps / weeklyGoal)*100)))
    }, [pratimai, weeklyGoal])
    
    const handleGoalChange =(e)=>{
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >0){
            setWeeklyGoal(value)
        }
    }

    return (
        <div className="stats">
            <button onClick={()=> navigate("/")} className="back-button">Atgal</button>
            <h2>Statistika</h2>
            <div className="goal">
                <h3>Savaitės tikslas: {" "}
                    <input type= "number" value= {weeklyGoal} onChange={handleGoalChange} min= {1} style={{width: "80px"}}/>
                </h3>
                <div className="progress">
                    <div className="progress-bar"
                    style={{width: `${progress}%`, backgroundColor : progress >=100? "var(--primary)" : "var(--progress-color"}}>

                    </div>
                    
                </div>
                <p>{progress}% pasiekta</p>
            </div>

            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data= {data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="reps" stroke="#f2d93b" strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Stats