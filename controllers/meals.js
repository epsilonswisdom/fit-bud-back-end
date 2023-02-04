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

export {
  create,
}