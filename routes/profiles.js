import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.post('/:id/comments', checkAuth, profilesCtrl.createComment)
router.post('/:id', checkAuth, profilesCtrl.addToMealPlan)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:profileId/comments/:commentId', checkAuth, profilesCtrl.updateComment)
router.delete('/:profileId/comments/:commentId', checkAuth, profilesCtrl.deleteComment)

export { router }
