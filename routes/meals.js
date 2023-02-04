import { Router } from "express"
import * as mealsCtrl from '../controllers/meals.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 

router.use(decodeUserFromToken)
//POST Route
router.post('/', checkAuth, mealsCtrl.create)
// GET route
router.get('/', checkAuth, mealsCtrl.index)
// GET route
router.get('/:id', checkAuth, mealsCtrl.show)
// PUT Route
router.put('/:id', checkAuth, mealsCtrl.update)
export { router }