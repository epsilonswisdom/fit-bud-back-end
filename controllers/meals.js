import { Meal } from "../models/meal.js"
import { Profile } from "../models/profile.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const meal = await Meal.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { meals: meal } }, 
      { new: true }
    )
    meal.author = profile
    res.status(201).json(meal)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
//index functionality
const index = async (req, res) => {
  try {
    const meals = await Meal.find({})
    .populate('author')
    .sort({ createdAt: 'desc' })
    res.status(200).json(meals)
  } catch (error) {
    res.status(500).json(error)
  }
}
// show function
const show = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
      .populate('author')
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index, 
  show,
}