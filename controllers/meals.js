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
// show functionality
const show = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
      .populate('author')
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
    if (meal.author.equals(req.user.profile)) {
      await Meal.findByIdAndDelete(req.params.id)
      const profile = await Profile.findById(req.user.profile)
      profile.meals.remove({ _id: req.params.id })
      await profile.save()
      res.status(200).json(meal)
    } else {
      throw new Error('Not authorized')
    }
  } catch (err) {
    console.log(err) 
    res.status(500).json(err)
  }
}

export {
  create,
  index, 
  show,
  update,
  deleteMeal as delete,
}