import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as exercisesCtrl from '../controllers/exercises.js'
const router = Router()

// ===========Public Routes=======


// ====== Protected Routes =======
router.use(decodeUserFromToken)
// GET Route
router.get('/', checkAuth, exercisesCtrl.index)
//Post Route
router.post('/', checkAuth, exercisesCtrl.create)
// PUT Route
router.put('/:id', checkAuth, exercisesCtrl.update)
// Delete Route
router.delete('/:id', checkAuth, exercisesCtrl.delete)

export {router}