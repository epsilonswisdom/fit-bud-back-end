import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

import * as exercisesCtrl from '../controllers/exercises.js'
const router = Router()

// ===========Public Routes=======


// ====== Protected Routes =======
router.use(decodeUserFromToken)
router.post('/', checkAuth, exercisesCtrl.create)

export {router}