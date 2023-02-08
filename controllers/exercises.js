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

const show = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
    .populate('author')
    res.status(200).json(exercise)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(exercise)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
    if (exercise.author.equals(req.user.profile)) {
      await Exercise.findByIdAndDelete(req.params.id)
      const profile = await Profile.findById(req.user.profile)
      profile.exercises.remove({ _id: req.params.id })
      await profile.save()
      res.status(200).json(exercise)
    } else {
      throw new Error('Not authorized')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try{
  req.body.author = req.user.profile
  const exercise = await Exercise.findById(req.params.id)
  exercise.comments.push(req.body)
  await exercise.save()

  const NewComment = exercise.comments[exercise.comments.length - 1]

  const profile = await Profile.findById(req.user.profile)
  NewComment.author = profile

  res.status(201).json(newComment)  
 } catch (error) {
  res.status(500).json(error)
 }
}
const updateComment = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId)
    const comment = exercise.comments.id(req.params.commentId)
    comment.text = req.body.text
    await exercise.save()
    res.status(200).json(exercise)
  } catch (err) {
    res.status(500).json(err)
  }
}
const deleteComment = async (req, res) => {
  try {
    const exercise =await Exercise.findById(req.params.exerciseId)
    exercise.comments.remove({ _id: req.params.commentId})
    await exercise.save()
    res.status(200).json(exercise)
  } catch (err) {
    res.status(500).json(err)
  }
}
export {
  createComment,
  updateComment,
  deleteComment,

  create,
  index,
  show,
  update,
  deleteExercise as delete,
}