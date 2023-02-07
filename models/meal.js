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
  description: String,
  comments: [ commentSchema ]
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}

