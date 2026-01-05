import dotenv from 'dotenv'
import express from 'express'
import pratimaiRoutes from './routes/pratimai.js'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import cors from 'cors'
// load .env from backend folder (we run npm from project root)
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') })

import path from 'path'

//express app
const app = express()

//cors middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
//middleware
app.use(express.json())
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
    
})
//routes 

app.use('/api/pratimai', pratimaiRoutes)
app.use('/api/user', userRoutes)
app.get('/',(req, res)=>{
    res.json({mssg: 'Welcome to the app!'})
} )
//connect to DB
mongoose.connect(process.env.URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('listening on port', process.env.PORT);
            
        })
    })
    .catch((err)=> console.log(err)
    )




