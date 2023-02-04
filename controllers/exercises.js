import { Exercise } from "../models/exercise"
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Exercise.find({})
  .then
}