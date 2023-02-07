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
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:id/comments/:commentId', checkAuth, profilesCtrl.updateComment)

export { router }
