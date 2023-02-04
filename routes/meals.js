import { Router } from "express"
import * as mealsCtrl from '../controllers/meals.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 

router.use(decodeUserFromToken)
router.post('/', checkAuth, mealsCtrl.create)

export { router }