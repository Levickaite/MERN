import Workout from '../models/pratimoModelis.js'
import mongoose from 'mongoose'

// GET - paimti visus rpatimus
export const getWorkouts = async (req, res)=>{
    const user_id= req.user._id
    const pratimai = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(pratimai)
}

//POST - sukurti naują pratimą
export const createWorkout = async (req, res)=>{
    const {title, reps, load} = req.body

    let emptyFields=[]
    if(!title) {emptyFields.push('title')}
    if(!load) {emptyFields.push('load')}
    if(!reps) {emptyFields.push('reps')}
    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Prašome užpildyti visus laukelius', emptyFields})
    }
    try {
        const user_id = req.user._id
        const pratimas = await Workout.create({title, reps, load, user_id})
        res.status(200).json(pratimas)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//PATCH - redaguoti vieną pratimą
export const updateWorkout = async (req, res)=> {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Tokio pratimo nėra.'})
    }
    const pratimas = await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
    if(!pratimas){
        return res.status(404).json({error: 'Tokio pratimo nėra.'})
    }
    res.status(200).json(pratimas)
}

//DELETE - ištrinti vieną pratimą
export const deleteWorkout = async (req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Tokio pratimo nėra'})
    }
    const pratimas = await Workout.findOneAndDelete({_id: id})
    if(!pratimas){
        return res.status(404).json({error: 'Tokio pratimo nėra'})
    }
    res.status(200).json(pratimas)

}