import {router} from 'express'
import {login,getHomepage} from '../controllers/userContoller.js'


router.post('/login',login);

router.get('/homepage',getHomepage);

module.exports = router;
