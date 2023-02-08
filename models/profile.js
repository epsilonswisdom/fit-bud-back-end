import mongoose from 'mongoose'

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

const profileSchema = new Schema({
  name: String,
  photo: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  mealPlans: [],
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  comments: [commentSchema],
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
