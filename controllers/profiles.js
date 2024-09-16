import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(error)
    res.status(500).json(error)
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
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
  })
}

  const show = async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id)
      .populate('meals')
      .populate('exercises')
      .populate('blogs')
      .populate('comments.author')
        res.status(200).json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const createComment = async (req, res) => {
    try {
      req.body.author = req.user.profile
      const profiles = await Profile.findById(req.params.id)
      profiles.comments.push(req.body)
      await profiles.save()
  
      const newComment = profiles.comments[profiles.comments.length - 1]
  
      const profile = await Profile.findById(req.user.profile)
      newComment.author = profile
  
      res.status(201).json(newComment)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const updateComment = async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.profileId)
      const comment = profile.comments.id(req.params.commentId)
      comment.text = req.body.text
      await profile.save()
      res.status(200).json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const deleteComment = async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.profileId)
      profile.comments.remove({ _id: req.params.commentId })
      await profile.save()
      res.status(200).json(profile)
    } catch (error) {
      res.status(500).json(error)
    }
  }

export { 
  index, 
  addPhoto, 
  show,
  createComment,
  updateComment,
  deleteComment,
}
