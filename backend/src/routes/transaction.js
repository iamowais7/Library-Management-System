import {router} from 'express'
import {checkBookAvailability,issueBook,returnBook,payFine} from '../controllers/transactionController.js'


router.get('/availability/:bookId',checkBookAvailability);


router.post('/issue',issueBook);


router.post('/return',returnBook);


router.post('/pay-fine',payFine);

module.exports = router;