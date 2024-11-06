import {router} from 'express'
import {addMembership,updateMembership,getMasterListOfMemberships} from '../controllers/membershipContoller.js'
import {verifyJWT,adminOnly} from '../middleware/middleware.js'

router.post('/add', verifyJWT, adminOnly, MembershipController.addMembership);
router.put('/update/:id', verifyJWT, adminOnly, MembershipController.updateMembership);
router.get('/list', verifyJWT, MembershipController.getMasterListOfMemberships);

module.exports = router;
