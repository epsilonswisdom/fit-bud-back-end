import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealSchema = new Schema ({
  name: String,
  author: { type: Schema.Types.ObjectId, ref: "Profile"},
  description: String,
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}