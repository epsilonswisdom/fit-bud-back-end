import { Router } from "express"
import * as mealsCtrl from '../controllers/meals.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 

router.use(decodeUserFromToken)
// GET route
router.get('/', checkAuth, mealsCtrl.index)
// GET route
router.get('/:id', checkAuth, mealsCtrl.show)
//POST Route
router.post('/', checkAuth, mealsCtrl.create)
// POST Route
router.post('/:id/comments', checkAuth, mealsCtrl.createComment)
// PUT Route
router.put('/:id', checkAuth, mealsCtrl.update)
// PUT Route
router.put('/:mealId/comments/:commentId', checkAuth, mealsCtrl.updateComment)
// DELETE route
router.delete('/:id', checkAuth, mealsCtrl.delete)


export { router }