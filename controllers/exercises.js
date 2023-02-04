import { Exercise } from "../models/exercise.js"
import { v2 as cloudinary } from 'cloudinary'

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const exercise = await Exercise.create(req.body)
    const profile = await Exercise.findByIdAndUpdate(
      req.user.profile,
      { $push: { exercises: exercise } },
      { new : true }
      )
      exercise.author = profile
      res.status(201).json(exercise)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
}