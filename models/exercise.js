import mongoose from "mongoose";

const Schema = mongoose.Schema

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
    author: { type: Schema.Types.ObjectId, ref: 'Profile'}
  },
  {timestamps: true}
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

export { Exercise }