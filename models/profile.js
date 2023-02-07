import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
