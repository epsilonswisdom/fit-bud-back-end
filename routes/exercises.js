import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as exercisesCtrl from '../controllers/exercises.js'
const router = Router()

// ===========Public Routes=======


// ====== Protected Routes =======
router.use(decodeUserFromToken)
// GET Route
router.get('/', checkAuth, exercisesCtrl.index)
// Show Route
router.get('/:id', checkAuth, exercisesCtrl.show)
//Post Route
router.post('/', checkAuth, exercisesCtrl.create)
// PUT Route
router.put('/:id', checkAuth, exercisesCtrl.update)
// Post Route Create Comment Card
router.post('/:id/comments', checkAuth, exercisesCtrl.createComment)
// Put Exercise Comment Card Route
router.put('/:exerciseId/comments/:commentId', checkAuth, exercisesCtrl.updateComment)
// Delete Route
router.delete('/:id', checkAuth, exercisesCtrl.delete)
// Delete Route for Comment
router.delete('/:exerciseId/comments/:commentId', checkAuth, exercisesCtrl.deleteComment)

export {router}