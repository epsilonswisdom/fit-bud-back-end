import { Exercise } from "../models/exercise.js"
import { Profile } from "../models/profile.js"
// import { v2 as cloudinary } from 'cloudinary'

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const exercise = await Exercise.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
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

const index = async (req, res) => {
  try {
    const exercises = await Exercise.find({})
    .populate('author')
    .sort({ createdAt: 'desc' })
    res.status(200).json(exercises)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index
}