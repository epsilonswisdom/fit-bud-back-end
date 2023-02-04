import mongoose from "mongoose";

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  }
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

export { Exercise }