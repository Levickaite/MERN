import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login useer
export const loginUser = async (req, res)=>{
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//signup user
export const signupUser = async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//get goal
export const getGoal = async (req, res) => {
    const user_id = req.user._id
    try {
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ goal: user.goal })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//update goal
export const updateGoal = async (req, res) => {
    const user_id = req.user._id
    const { goal } = req.body
    try {
        const user = await User.findByIdAndUpdate(user_id, { goal }, { new: true })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ goal: user.goal })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
