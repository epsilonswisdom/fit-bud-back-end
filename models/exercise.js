import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: { type:Schema.Types.ObjectId, ref: 'Profile' }
  },
  {timestamps: true}
)
const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Coordination'],
    },
    // image: String,
    comments: [commentSchema],
    author: { type: Schema.Types.ObjectId, ref: 'Profile'}
  },
  {timestamps: true}
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

export { Exercise }