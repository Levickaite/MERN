import express from 'express'
import * as controller from '../controllers/controller.js'
import requireAuth from '../middleware/requireAuth.js'


const router = express.Router()
router.use(requireAuth)

//GET - paimti visus pratimus
router.get('/', controller.getWorkouts)

//GET - ppaimti vieną pratimą 
router.get('/:id', (req, res)=>{
    res.json({mssg: 'GET vieną pratimą'})
})

// POST - sukurti naują pratimą
router.post('/', controller.createWorkout)

//PATCH - redaguoti vieną pratimą
router.patch('/:id', controller.updateWorkout)
//DELETE - ištrinti vieną pratimą
router.delete('/:id', controller.deleteWorkout)

export default router