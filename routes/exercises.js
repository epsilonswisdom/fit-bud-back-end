import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

import * as exercisesCtrl from '../controllers/exercises.js'
const router = Router()

// ===========Public Routes=======


// ====== Protected Routes =======
router.use(decodeUserFromToken)
//Post Route
router.post('/', checkAuth, exercisesCtrl.create)
// GET Route
router.get('/', checkAuth, exercisesCtrl.index)
export {router}