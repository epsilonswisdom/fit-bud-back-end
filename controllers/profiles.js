import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

  const show = async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id)
      .populate('meals')
      .populate('exercises')
        res.status(200).json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const createComment = async (req, res) => {
    try {
      req.body.author = req.user.profile
      const blog = await Blog.findById(req.params.id)
      blog.comments.push(req.body)
      await blog.save()
  
      const newComment = blog.comments[blog.comments.length - 1]
  
      const profile = await Profile.findById(req.user.profile)
      newComment.author = profile
  
      res.status(201).json(newComment)
    } catch (error) {
      res.status(500).json(error)
    }
  }

export { 
  index, 
  addPhoto, 
  show,
  createComment,
}
