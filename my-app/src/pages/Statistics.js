import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Stats = () =>{
    const { user } = useAuthContext()
    const [data, setData] = useState([])
    const [progress, setProgress] = useState(0)
    const {pratimai} = useWorkoutContext()

    const [weeklyGoal, setWeeklyGoal] = useState(500)
    const navigate = useNavigate()
    const [period, setPeriod] = useState("week")
    const [customStart, setCustomStart] = useState("")
    const [customEnd, setCustomEnd] = useState("")

    useEffect(()=>{
        if(!pratimai) return

        let start, end;
        const now = new Date()

        if(period === "week"){
            const dayOfWeek = now.getDay()
            start = new Date(now)
            start.setDate(now.getDate() - dayOfWeek+1)
            start.setHours(0,0,0,0)
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
        }

        if (period === "month") {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            end.setHours(23, 59, 59, 999);
        }

        if (period === "year") {
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear(), 11, 31);
            end.setHours(23, 59, 59, 999);
        }

        if (period === "custom" && customStart && customEnd) {
            start = new Date(customStart);
            start.setHours(0, 0, 0, 0);
            end = new Date(customEnd);
            end.setHours(23, 59, 59, 999);
        }
        
        if(!start || !end) return
        const grouped={}
        let labels = []

        if(period === "week"){
            labels =[ "Mon", "Tue", "Wed", "Thu", "Fri","Sat", "Sun"]
        }else if(period ==="month"){
            const daysInMonth= new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()
            labels = Array.from({length: daysInMonth}, (_, i)=> `${i+1}`)
        } else if(period ==="year"){
            labels= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }else if(period ==="custom"){
            const diffTime = end.getTime()-start.getTime()
            const diffDays= diffTime / (1000 * 3600 *24)
            labels = Array.from({length: diffDays+1}, (_, i)=> {
                const d = new Date(start)
                d.setDate(start.getDate()+i)
                return d.toLocaleDateString("en-US")
            })
        }

        pratimai.forEach((pratimas)=>{
            const date = new Date(pratimas.createdAt)
            if (date >= start && date <= end){
                let key
                if(period ==="week"){
                    key = date.toLocaleString("en-US", {weekday: "short"})
                } else if(period ==="month"){
                    key = date.getDate().toString()
                }else if (period ==="year"){
                    key= date.toLocaleString("en-US", {month:"short"})
                }else if (period ==="custom"){
                    key= date.toLocaleDateString("en-US")
                }
                if(!grouped[key]) grouped[key]=0
                grouped[key] += pratimas.reps
            }
        })
        const chartData = labels.map((label)=> ({
            label,
            reps: grouped[label] || 0
        }))

        setData(chartData)
        
        
        const totalReps = pratimai.filter((item)=>{
            const d= new Date(item.createdAt)
            return d >= start && d<= end
        }). reduce((sum, item)=> sum + item.reps, 0)
        
        setProgress(Math.min(100, Math.round((totalReps / weeklyGoal)*100)))
    }, [pratimai, weeklyGoal, period, customStart, customEnd])

    useEffect(() => {
        const fetchGoal = async () => {
            const response = await fetch('/api/user/goal', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setWeeklyGoal(json.goal);
            }
        };
        if (user) {
            fetchGoal();
        }
    }, [user]);

    const handleGoalChange = async (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setWeeklyGoal(value);
            
            const response = await fetch('/api/user/goal', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ goal: value })
            });
            
        }
    };

    const getProgressBarColor = () => {
        if (progress < 30) return '#e7195a';
        if (progress >= 30 && progress <= 70) return '#f2d93b';
        return '#1aac83';
    };

    // Safe computed records — guard against pratimai being null
    const maxLoad = pratimai ? Math.max(0, ...(pratimai.map(p => p.load || 0))) : 0;
    const maxReps = pratimai ? Math.max(0, ...(pratimai.map(p => p.reps || 0))) : 0;

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
                    style={{width: `${progress}%`, backgroundColor: getProgressBarColor()}}>

                    </div>

                </div>
                <p>{progress}% pasiekta</p>
            </div>
            <div className="records">
                <h3>Asmeniniai rekordai</h3>
                <p>Didžiausias svoris: {maxLoad} kg</p>
                <p>Daugiausiai pakartojimų: {maxReps}</p>
            </div>

            <div className="period-toggle">
                <button className={period === "week" ? "active" : ""} onClick={() => setPeriod("week")}>Savaitė</button>
                <button className={period === "month" ? "active" : ""} onClick={() => setPeriod("month")}>Mėnuo</button>
                <button className={period === "year" ? "active" : ""} onClick={() => setPeriod("year")}>Metai</button>
                <button className={period === "custom" ? "active" : ""} onClick={() => setPeriod("custom")}>Custom</button>
            </div>
            {period ==="custom" && (
                <div className="custom-range">
                    <input type="date" value={customStart} onChange={(e)=> setCustomStart(e.target.value)}/>
                    <input type="date" value={customEnd} onChange={(e)=> setCustomEnd(e.target.value)}/>
                </div>
            )}
            <div className="chart">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data= {data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="label"/>
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