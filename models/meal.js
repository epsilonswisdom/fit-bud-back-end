import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type:Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const mealSchema = new Schema ({
  name: String,
  author: { type: Schema.Types.ObjectId, ref: "Profile"},
  // image: String,
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['Snack', 'Protein', 'Fruit', 'Organic', 'Cheat Meal'],
  },
  comments: [ commentSchema ],
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}

